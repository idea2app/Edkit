import assert from 'node:assert/strict';
import { it } from 'node:test';

import { eventually, matrix } from './browser.js';

matrix(getEditor => {
    it('renders the same complete toolbar and accessible editing surface', async () => {
        const { editor, toolbar } = getEditor();

        assert.equal(await toolbar.locator('button').count(), 30);
        assert.equal(await editor.getAttribute('contenteditable'), 'true');
        assert.equal(await editor.getAttribute('aria-multiline'), 'true');
        assert.equal(await editor.getAttribute('tabindex'), '0');
        assert.equal((await editor.textContent())?.trim(), 'Hello Edkit!');
        assert.equal(await editor.locator('b').textContent(), 'Edkit');
    });

    it('initializes HTML and the form value from defaultValue', async () => {
        const harness = getEditor();
        const value = '<p>Default <strong>content</strong></p>';

        await harness.open({ value });
        assert.equal((await harness.editor.innerHTML()).trim(), value);
        assert.equal(await harness.value(), value);
    });

    it('supports an empty defaultValue', async () => {
        const harness = getEditor();
        await harness.open({ value: '' });

        assert.equal((await harness.editor.innerHTML()).trim(), '');
        assert.equal(await harness.value(), '');
    });

    it('uses the default toolbar when tools are omitted', async () => {
        const harness = getEditor();
        await harness.open({ tools: 'default' });

        assert.equal(await harness.toolbar.locator('button').count(), 22);
        assert.equal(await harness.tool('Bold').count(), 1);
        assert.equal(await harness.tool('Copy Markdown').count(), 0);
        assert.equal(await harness.tool('Video').count(), 0);
    });

    it('renders only the supplied custom tools', async () => {
        const harness = getEditor();
        await harness.open({ tools: 'custom' });

        assert.equal(await harness.toolbar.locator('button').count(), 1);
        assert.equal(await harness.tool('Bold').count(), 1);

        await harness.select();
        await harness.tool('Bold').click();
        assert.equal(
            await harness.editor.locator('b, strong').innerText(),
            'Edkit sample'
        );
    });

    it('emits changes and synchronizes the named form field after typing', async () => {
        const harness = getEditor();
        await harness.editor.fill('Updated content');

        await eventually(async () => {
            const html = (await harness.editor.innerHTML()).trim();

            assert.equal(await harness.editor.innerText(), 'Updated content');
            assert.equal(await harness.value(), html);
            assert.equal(
                await harness.page.locator('#change').textContent(),
                html
            );
        });
    });

    it('submits the current rich HTML through FormData', async () => {
        const harness = getEditor();

        await harness.editor.fill('Submitted content');
        await harness.page
            .getByRole('button', { name: 'Submit', exact: true })
            .click();
        assert.equal(
            await harness.page.locator('#submitted').textContent(),
            (await harness.editor.innerHTML()).trim()
        );
    });

    it('preserves the manual demo submission alert', async () => {
        const harness = getEditor();
        await harness.page.goto(harness.url, { waitUntil: 'domcontentloaded' });
        await harness.editor.waitFor({ timeout: 30000 });
        await harness.editor.fill('Manual submission');

        const html = (await harness.editor.innerHTML()).trim();
        const dialog = harness.page.waitForEvent('dialog');
        const submit = harness.page
            .getByRole('button', { name: 'Submit', exact: true })
            .click();
        const alert = await dialog;
        try {
            assert.equal(alert.type(), 'alert');
            assert.equal(alert.message(), html);
        } finally {
            await alert.accept();
        }
        await submit;
        assert.equal(
            await harness.page.locator('#submitted').textContent(),
            html
        );
    });

    it('loads Bootstrap 6 themes and preserves half-rem toolbar gaps', async () => {
        const harness = getEditor();
        const button = harness.tool('Bold');
        const styles = await button.evaluate(element => {
            const style = getComputedStyle(element);
            return {
                marginBottom: style.marginBottom,
                marginInlineEnd: style.marginInlineEnd,
                borderStyle: style.borderStyle,
                theme: style.getPropertyValue('--bs-theme-bg').trim()
            };
        });
        assert.equal(styles.marginBottom, '8px');
        assert.equal(styles.marginInlineEnd, '8px');
        assert.equal(styles.borderStyle, 'solid');
        assert.notEqual(styles.theme, '');
        assert.match(
            (await button.getAttribute('class')) ?? '',
            /\bbtn-outline\b/
        );
        assert.match(
            (await button.getAttribute('class')) ?? '',
            /\btheme-secondary\b/
        );
        assert.equal(
            await button
                .locator('i')
                .evaluate(
                    element => getComputedStyle(element, '::before').fontFamily
                ),
            'bootstrap-icons'
        );
    });

    it('shows selected formatting as an active Bootstrap 6 tool', async () => {
        const harness = getEditor();

        await harness.editor.evaluate(element => {
            element.innerHTML = '<p><b>Active text</b></p>';
            element.focus();
            const range = document.createRange();
            range.selectNodeContents(element.querySelector('b')!.firstChild!);
            getSelection()!.removeAllRanges();
            getSelection()!.addRange(range);
        });
        await eventually(async () =>
            assert.match(
                (await harness.tool('Bold').getAttribute('class')) ?? '',
                /\bbtn-solid\b/
            )
        );
    });
});
