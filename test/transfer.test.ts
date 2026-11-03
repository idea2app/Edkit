import assert from 'node:assert/strict';
import { it } from 'node:test';

import { eventually, matrix } from './browser.js';

matrix(getEditor => {
    for (const event of ['paste', 'drop'] as const) {
        it(`${event}: converts Markdown text into HTML and emits the form value`, async () => {
            const harness = getEditor();

            await harness.editor.fill('');
            await harness.transfer(event, [
                { type: 'text/plain', value: '# Heading\n\n**Bold** text' }
            ]);
            await eventually(async () => {
                assert.equal(await harness.editor.locator('h1').count(), 1);
                assert.equal(await harness.editor.locator('strong').count(), 1);

                const html = (await harness.editor.innerHTML()).trim();
                assert.equal(await harness.value(), html);
                assert.equal(
                    await harness.page.locator('#change').textContent(),
                    html
                );
            });
        });

        it(`${event}: inserts HTML, strips data attributes and normalizes whitespace`, async () => {
            const harness = getEditor();

            await harness.editor.fill('');
            await harness.transfer(event, [
                { type: 'text/plain', value: 'Rich text' },
                {
                    type: 'text/html',
                    value: '<p data-source="external" style="white-space: pre"><b data-id="1">Rich text</b></p>'
                }
            ]);
            await eventually(async () => {
                assert.equal(await harness.editor.locator('b').count(), 1);
                assert.equal(
                    await harness.editor
                        .locator('[data-source], [data-id]')
                        .count(),
                    0
                );
                assert.equal(
                    await harness.editor
                        .locator('p')
                        .filter({ hasText: 'Rich text' })
                        .evaluate(element => element.style.whiteSpace),
                    'normal'
                );
                assert.equal(
                    await harness.value(),
                    (await harness.editor.innerHTML()).trim()
                );
            });
        });

        it(`${event}: preserves remote media URLs in HTML`, async () => {
            const harness = getEditor();

            await harness.editor.fill('');
            await harness.page.route('https://media.example/**', route =>
                route.fulfill({ status: 204, body: '' })
            );
            await harness.transfer(event, [
                {
                    type: 'text/html',
                    value: '<img src="https://media.example/image.png"><audio src="https://media.example/audio.wav"></audio><video src="https://media.example/video.mp4"></video>'
                }
            ]);
            await eventually(async () => {
                for (const [tag, path] of [
                    ['img', 'image.png'],
                    ['audio', 'audio.wav'],
                    ['video', 'video.mp4']
                ])
                    assert.equal(
                        await harness.editor.locator(tag).getAttribute('src'),
                        `https://media.example/${path}`
                    );
            });
        });

        it(`${event}: uploads inline data-URL media in HTML`, async () => {
            const harness = getEditor();

            await harness.editor.fill('');
            await harness.transfer(event, [
                {
                    type: 'text/html',
                    value: '<img src="data:image/png;base64,iVBORw0KGgo=">'
                }
            ]);
            await eventually(async () => {
                assert.equal(await harness.editor.locator('img').count(), 1);
                assert.match(
                    (await harness.editor.locator('img').getAttribute('src')) ??
                        '',
                    /^blob:/
                );
            });
        });

        for (const [tag, type, name] of [
            ['img', 'image/png', 'image.png'],
            ['audio', 'audio/wav', 'audio.wav'],
            ['video', 'video/mp4', 'video.mp4']
        ])
            it(`${event}: uploads a ${type} file`, async () => {
                const harness = getEditor();

                await harness.editor.fill('');
                await harness.transfer(event, [], {
                    name,
                    type,
                    bytes: [1, 2, 3]
                });
                await eventually(async () => {
                    assert.equal(await harness.editor.locator(tag).count(), 1);
                    assert.match(
                        (await harness.editor
                            .locator(tag)
                            .getAttribute('src')) ?? '',
                        /^blob:/
                    );
                    assert.equal(
                        await harness.value(),
                        (await harness.editor.innerHTML()).trim()
                    );
                });
            });
    }
});
