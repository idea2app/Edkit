import { createRoot } from 'react-dom/client';
import { formToJSON } from 'web-utility';
import { configure } from 'mobx';

import { Editor, EditorProps, OriginalTools, ExtraTools } from '../source';

configure({ enforceActions: 'never' });

const params = new URLSearchParams(location.search);
const preset = params.get('tools');

let tools: EditorProps['tools'] = [...OriginalTools, ...ExtraTools];
if (preset === 'default') tools = undefined;
else if (preset === 'custom') tools = [OriginalTools[0]];

createRoot(document.querySelector('main')!).render(
    <form
        className="container"
        onSubmit={event => {
            event.preventDefault();

            const { content } = formToJSON(event.currentTarget);

            document.querySelector('#submitted')!.textContent = content + '';

            if (!params.has('test')) alert(content);
        }}
    >
        <legend>React Bootstrap editor</legend>

        <Editor
            tools={tools}
            name="content"
            defaultValue={params.get('value') ?? 'Hello <b>Edkit</b>!'}
            onChange={value => {
                document.querySelector('#change')!.textContent = value;
                console.log(value);
            }}
        />
        <button
            className="btn-solid theme-primary my-3"
            type="submit"
            aria-label="Submit"
        >
            √
        </button>
    </form>
);
