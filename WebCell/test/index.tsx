import { configure } from 'mobx';
import { DOMRenderer } from 'dom-renderer';

import { HTMLEditor, OriginalTools } from '../source';

configure({ enforceActions: 'never' });

new DOMRenderer().render(
    // @ts-ignore
    <form className="container">
        <HTMLEditor tools={OriginalTools} onChange={console.log} />
    </form>,
    document.querySelector('main')
);
