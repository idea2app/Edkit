import { DOMRenderer } from 'dom-renderer';
import { formToJSON } from 'web-utility';
import { configure } from 'mobx';

import { HTMLEditor, EditorProps, OriginalTools, ExtraTools } from '../source';

configure({ enforceActions: 'never' });

const params = new URLSearchParams(location.search);
const preset = params.get('tools');

let tools: EditorProps['tools'] = [...OriginalTools, ...ExtraTools];
if (preset === 'default') tools = undefined;
else if (preset === 'custom') tools = [OriginalTools[0]];

new DOMRenderer().render(
    <form
        className="container"
        onSubmit={(event: SubmitEvent) => {
            event.preventDefault();

            const { content } = formToJSON(
                event.currentTarget as HTMLFormElement
            );
            document.querySelector('#submitted')!.textContent = content + '';

            if (!params.has('test')) alert(content);
        }}
    >
        <legend className="float-none">BootCell editor</legend>

        <HTMLEditor
            tools={tools}
            name="content"
            defaultValue={params.get('value') ?? 'Hello <b>Edkit</b>!'}
            onChange={(event: CustomEvent<string>) => {
                document.querySelector('#change')!.textContent = event.detail;
                console.log(event);
            }}
        />
        <button
            className="btn-solid theme-primary my-3"
            type="submit"
            aria-label="Submit"
        >
            √
        </button>
    </form>,
    document.querySelector('main')!
);
