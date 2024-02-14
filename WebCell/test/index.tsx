import { configure } from 'mobx';
import { DOMRenderer } from 'dom-renderer';

import { HTMLEditor, OriginalTools } from '../source';

configure({ enforceActions: 'never' });

new DOMRenderer().render(
    // @ts-ignore
    <form className="container">
        <legend>BootCell editor</legend>

        <HTMLEditor
            tools={OriginalTools}
            name="content"
            onChange={console.log}
        />
        <button className="btn btn-primary my-2">√</button>
    </form>,
    document.querySelector('main')
);
