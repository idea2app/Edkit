import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { after, afterEach, before, beforeEach, describe } from 'node:test';
import { setTimeout } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import {
    chromium,
    firefox,
    webkit,
    type Browser,
    type BrowserContext,
    type Locator,
    type Page
} from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(new URL('../package.json', import.meta.url));
const engines = { chromium, firefox, webkit };
const wrappers = ['react', 'webcell'] as const;

export class EditorPage {
    readonly editor: Locator;
    readonly toolbar: Locator;

    constructor(
        readonly page: Page,
        readonly url: string
    ) {
        this.editor = page.locator('[role="textbox"][contenteditable="true"]');
        this.toolbar = page.locator('header');
    }

    async open(options: { tools?: string; value?: string } = {}) {
        await this.page.goto(
            `${this.url}?${new URLSearchParams({ ...options, test: '1' })}`,
            { waitUntil: 'domcontentloaded' }
        );
        await this.editor.waitFor({ timeout: 30000 });
        await this.toolbar
            .locator('button')
            .first()
            .waitFor({ timeout: 30000 });
        await eventually(async () =>
            assert.equal(
                await this.page
                    .locator('link[rel="stylesheet"]')
                    .evaluateAll(links =>
                        links.every(link => (link as HTMLLinkElement).sheet)
                    ),
                true,
                'Editor stylesheets must be loaded'
            )
        );
    }

    tool(name: string) {
        return this.toolbar.locator(`button[title^="${name}"]`);
    }

    async select(markup = '<p>Edkit sample</p>') {
        await this.editor.evaluate((element, html) => {
            element.innerHTML = html;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.focus();

            const range = document.createRange();
            range.selectNodeContents(element);

            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
            );
            const first = walker.nextNode();
            if (first) {
                let last = first;
                while (walker.nextNode()) last = walker.currentNode;
                range.setStart(first, 0);
                range.setEnd(last, last.textContent!.length);
            }
            const selection = getSelection()!;
            selection.removeAllRanges();
            selection.addRange(range);
        }, markup);
    }

    async value() {
        return this.page
            .locator('form')
            .evaluate(form =>
                new FormData(form as HTMLFormElement).get('content')
            );
    }

    async transfer(
        event: 'paste' | 'drop',
        data: { type: string; value: string }[],
        file?: { name: string; type: string; bytes: number[] }
    ) {
        await this.editor.evaluate(
            (element, { event, data, file }) => {
                element.focus();

                const range = document.createRange();
                range.selectNodeContents(element);
                range.collapse(false);

                const selection = getSelection()!;
                selection.removeAllRanges();
                selection.addRange(range);

                const transfer = new DataTransfer();

                for (const { type, value } of data)
                    transfer.setData(type, value);

                if (file)
                    transfer.items.add(
                        new File([new Uint8Array(file.bytes)], file.name, {
                            type: file.type
                        })
                    );
                const dispatched =
                    event === 'paste'
                        ? new ClipboardEvent('paste', {
                              bubbles: true,
                              cancelable: true
                          })
                        : new DragEvent('drop', {
                              bubbles: true,
                              cancelable: true
                          });
                // Firefox ignores clipboardData passed to ClipboardEventInit.
                Object.defineProperty(
                    dispatched,
                    event === 'paste' ? 'clipboardData' : 'dataTransfer',
                    { value: transfer }
                );
                element.dispatchEvent(dispatched);
            },
            { event, data, file }
        );
    }
}

export async function eventually(check: () => Promise<void>) {
    const deadline = Date.now() + 5000;

    for (;;) {
        try {
            return await check();
        } catch (error) {
            if (
                !(error instanceof assert.AssertionError) ||
                Date.now() >= deadline
            )
                throw error;

            await setTimeout(25);
        }
    }
}

export function matrix(register: (getEditor: () => EditorPage) => void) {
    const styles = new Map<string, { body: Buffer; contentType: string }>();

    before(async () => {
        styles.set('/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css', {
            body: await readFile(
                require.resolve('bootstrap/dist/css/bootstrap.min.css')
            ),
            contentType: 'text/css'
        });
        const icons =
            require.resolve('bootstrap-icons/font/bootstrap-icons.css');

        styles.set('/bootstrap-icons@1.13.1/font/bootstrap-icons.css', {
            body: await readFile(icons),
            contentType: 'text/css'
        });
        for (const extension of ['woff', 'woff2'])
            styles.set(
                `/bootstrap-icons@1.13.1/font/fonts/bootstrap-icons.${extension}`,
                {
                    body: await readFile(
                        join(
                            icons,
                            '..',
                            'fonts',
                            `bootstrap-icons.${extension}`
                        )
                    ),
                    contentType: `font/${extension}`
                }
            );
    });

    for (const [engine, browserType] of Object.entries(engines))
        for (const wrapper of wrappers)
            describe(`${engine} / ${wrapper}`, { concurrency: false }, () => {
                let browser: Browser;
                let context: BrowserContext;
                let editor: EditorPage;
                let errors: string[];

                before(async () => (browser = await browserType.launch()));
                after(() => browser?.close());

                beforeEach(async () => {
                    errors = [];
                    context = await browser.newContext();

                    await context.addInitScript(() => {
                        Reflect.deleteProperty(window, 'showOpenFilePicker');
                        Reflect.deleteProperty(
                            HTMLInputElement.prototype,
                            'showPicker'
                        );
                    });
                    await context.route('https://unpkg.com/**', async route => {
                        const asset = styles.get(
                            new URL(route.request().url()).pathname
                        );
                        assert(
                            asset,
                            `Unexpected CDN request: ${route.request().url()}`
                        );
                        await route.fulfill(asset);
                    });
                    await context.tracing.start({
                        screenshots: true,
                        snapshots: true
                    });
                    const page = await context.newPage();
                    page.setDefaultTimeout(5000);
                    page.setDefaultNavigationTimeout(30000);
                    page.on('pageerror', error => {
                        errors.push(error.message);
                        console.error(`${engine} / ${wrapper}: ${error.stack}`);
                    });
                    editor = new EditorPage(
                        page,
                        `http://127.0.0.1:8080/${wrapper}/index.html`
                    );
                    await editor.open();
                });
                afterEach(async test => {
                    try {
                        const directory = resolve(root, 'test', 'results');
                        await mkdir(directory, { recursive: true });

                        const name =
                            `${engine}-${wrapper}-${test.name}`.replaceAll(
                                /[^a-zA-Z0-9-]/g,
                                '-'
                            );
                        await context.tracing.stop({
                            path: join(directory, `${name}.zip`)
                        });
                        assert.deepEqual(errors, [], 'Browser runtime errors');
                    } finally {
                        await context?.close();
                    }
                });

                register(() => editor);
            });
}
