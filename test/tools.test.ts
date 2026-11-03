import assert from 'node:assert/strict';
import { it } from 'node:test';

import { eventually, matrix } from './browser.js';

matrix(getEditor => {
    for (const [name, selector] of [
        ['Bold', 'b, strong'],
        ['Italic', 'i, em'],
        ['Underline', 'u'],
        ['Strike through', 's, del, strike'],
        ['H1', 'h1'],
        ['H2', 'h2'],
        ['H3', 'h3'],
        ['Subscript', 'sub'],
        ['Superscript', 'sup']
    ])
        it(`applies ${name} to selected content`, async () => {
            const harness = getEditor();

            await harness.select();
            await harness.tool(name).click();

            assert.equal(
                await harness.editor.locator(selector).innerText(),
                'Edkit sample'
            );
            await eventually(async () =>
                assert.equal(
                    await harness.value(),
                    (await harness.editor.innerHTML()).trim()
                )
            );
        });

    for (const [name, command, selector] of [
        ['Font Size down', 'decreaseFontSize', 'small'],
        ['Font Size up', 'increaseFontSize', 'big']
    ])
        it(`applies ${name} or exposes the engine's unsupported state`, async () => {
            const harness = getEditor();
            await harness.select();

            const supported = await harness.page.evaluate(
                command =>
                    document.queryCommandSupported(command) ||
                    document.queryCommandEnabled(command),
                command
            );
            const tool = harness.tool(name);
            assert.equal(await tool.isDisabled(), !supported);

            if (supported) {
                await tool.click();
                assert.equal(
                    await harness.editor.locator(selector).innerText(),
                    'Edkit sample'
                );
            } else
                assert.match(
                    (await tool.getAttribute('title')) ?? '',
                    /not supported/
                );
        });

    it('creates a link using the prompted URL', async () => {
        const harness = getEditor();
        await harness.select();

        harness.page.once('dialog', dialog =>
            dialog.accept('https://example.com/article')
        );
        await harness.tool('Link').click();

        assert.equal(
            await harness.editor.locator('a').getAttribute('href'),
            'https://example.com/article'
        );
        assert.equal(
            await harness.editor.locator('a').innerText(),
            'Edkit sample'
        );
    });

    it('leaves content unchanged when a link prompt is cancelled', async () => {
        const harness = getEditor();
        await harness.select();

        const before = await harness.editor.innerHTML();
        harness.page.once('dialog', dialog => dialog.dismiss());
        await harness.tool('Link').click();

        assert.equal(await harness.editor.innerHTML(), before);
    });

    for (const [name, property] of [
        ['Fore Color', 'color'],
        ['Back Color', 'backgroundColor']
    ] as const)
        it(`applies ${name} from the color selector`, async () => {
            const harness = getEditor();
            await harness.select();

            await harness.toolbar
                .locator(`span[title="${name}"] input[type="color"]`)
                .evaluate(element => {
                    Object.getOwnPropertyDescriptor(
                        HTMLInputElement.prototype,
                        'value'
                    )!.set!.call(element, '#123456');
                    element.dispatchEvent(
                        new Event('change', { bubbles: true })
                    );
                });
            assert.equal(
                await harness.editor.evaluate((element, property) => {
                    const text = [...element.querySelectorAll('*')].find(
                        node => node.childNodes[0]?.nodeType === Node.TEXT_NODE
                    );
                    if (!text) throw new Error('No formatted text found');
                    return getComputedStyle(text)[property];
                }, property),
                'rgb(18, 52, 86)'
            );
        });

    for (const [name, alignment] of [
        ['Align Left', 'left'],
        ['Align Center', 'center'],
        ['Align Right', 'right'],
        ['Align Full', 'justify']
    ])
        it(`applies ${name}`, async () => {
            const harness = getEditor();
            await harness.select(
                `<p style="text-align: ${alignment === 'left' ? 'right' : 'left'}">Align this text</p>`
            );
            await harness.tool(name).click();

            assert.equal(
                await harness.editor
                    .locator('p')
                    .evaluate(element =>
                        getComputedStyle(element).textAlign.replace(
                            /^-(moz|webkit)-/,
                            ''
                        )
                    ),
                alignment
            );
        });

    for (const [name, tag] of [
        ['Ordered list', 'ol'],
        ['Unordered list', 'ul']
    ])
        it(`creates an ${name}`, async () => {
            const harness = getEditor();
            await harness.select();
            await harness.tool(name).click();

            assert.equal(
                (await harness.editor.locator(`${tag} li`).innerText()).trim(),
                'Edkit sample'
            );
        });

    it('inserts a horizontal rule', async () => {
        const harness = getEditor();
        await harness.select();
        await harness.tool('Horizontal rule').click();

        assert.equal(await harness.editor.locator('hr').count(), 1);
    });

    it('embeds a web page from the prompted URL', async () => {
        const harness = getEditor();

        await harness.select();
        harness.page.once('dialog', dialog => dialog.accept('about:blank'));
        await harness.tool('Embed Web page').click();

        assert.equal(
            await harness.editor.locator('iframe').getAttribute('src'),
            'about:blank'
        );
    });

    for (const [name, tag, type, filename] of [
        ['Image', 'img', 'image/png', 'image.png'],
        ['Audio', 'audio', 'audio/wav', 'audio.wav'],
        ['Video', 'video', 'video/mp4', 'video.mp4']
    ])
        it(`uploads and inserts ${name}`, async () => {
            const harness = getEditor();
            await harness.select();

            const chooser = harness.page.waitForEvent('filechooser');
            await harness.tool(name).click();
            await (
                await chooser
            ).setFiles({
                name: filename,
                mimeType: type,
                buffer: Buffer.from('Edkit media fixture')
            });
            await harness.editor.locator(tag).waitFor({ state: 'attached' });

            assert.match(
                (await harness.editor.locator(tag).getAttribute('src')) ?? '',
                /^blob:/
            );
            if (tag !== 'img')
                assert.equal(
                    await harness.editor.locator(tag).getAttribute('controls'),
                    ''
                );
        });

    it('undoes a typed edit', async () => {
        const harness = getEditor();

        await harness.open({ value: '' });
        await harness.editor.pressSequentially('X');
        await harness.tool('Undo').click();

        assert.equal((await harness.editor.innerText()).trim(), '');
    });

    it('redoes an undone edit', async () => {
        const harness = getEditor();

        await harness.open({ value: '' });
        await harness.editor.pressSequentially('Redo me');
        await harness.tool('Undo').click();
        await harness.tool('Redo').click();

        assert.equal((await harness.editor.innerText()).trim(), 'Redo me');
    });

    it('removes formatting with Reset', async () => {
        const harness = getEditor();

        await harness.select('<p><b><i>Formatted text</i></b></p>');
        await harness.tool('Reset').click();

        assert.equal(
            await harness.editor.locator('b, strong, i, em').count(),
            0
        );
        assert.equal(await harness.editor.innerText(), 'Formatted text');
    });

    it('clears content and synchronizes the form value', async () => {
        const harness = getEditor();
        await harness.tool('Clear').click();

        assert.equal((await harness.editor.innerText()).trim(), '');
        await eventually(async () =>
            assert.equal(
                await harness.value(),
                (await harness.editor.innerHTML()).trim()
            )
        );
    });

    it('copies the editor content as Markdown', async () => {
        const harness = getEditor();
        await harness.select(
            '<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p>'
        );
        // Clipboard permissions differ by engine; capture only the native API boundary.
        await harness.page.evaluate(() => {
            Object.defineProperty(navigator.clipboard, 'writeText', {
                configurable: true,
                value: async (text: string) => {
                    document.querySelector('#submitted')!.textContent = text;
                }
            });
        });
        const dialog = harness.page.waitForEvent('dialog');
        const click = harness.tool('Copy Markdown').click();
        const alert = await dialog;

        assert.equal(alert.message(), 'Markdown copied to clipboard');

        await alert.accept();
        await click;

        assert.equal(
            await harness.page.locator('#submitted').textContent(),
            '# Title\n\n**Bold** and _italic_'
        );
    });
});
