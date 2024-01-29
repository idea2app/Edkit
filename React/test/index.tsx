import { configure } from 'mobx';
import { render } from 'react-dom';

import { Editor, OriginalTools } from '../source';

configure({ enforceActions: 'never' });

render(
    <form className="container">
        <Editor tools={OriginalTools} />
    </form>,
    document.querySelector('main')
);
