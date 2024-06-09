import { DOMRenderer } from 'dom-renderer';
import { formToJSON } from 'web-utility';
import { configure } from 'mobx';

import { HTMLEditor, OriginalTools, ExtraTools } from '../source';

configure({ enforceActions: 'never' });

new DOMRenderer().render(
    // @ts-ignore
    <form
        className="container"
        onSubmit={event => {
            event.preventDefault();

            const { content } = formToJSON(event.currentTarget);

            alert(content);
        }}
    >
        <legend className="float-none">BootCell editor</legend>

        <HTMLEditor
            tools={[...OriginalTools, ...ExtraTools]}
            name="content"
            onChange={console.log}
        />
        <button className="btn btn-primary my-2" type="submit">
            √
        </button>
    </form>,
    document.querySelector('main')
);
