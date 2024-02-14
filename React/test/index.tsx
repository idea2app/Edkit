import { configure } from 'mobx';
import { render } from 'react-dom';

import { Editor, OriginalTools } from '../source';

configure({ enforceActions: 'never' });

render(
    <form className="container">
        <legend>React Bootstrap editor</legend>

        <Editor tools={OriginalTools} name="content" onChange={console.log} />

        <button className="btn btn-primary my-2">√</button>
    </form>,
    document.querySelector('main')
);
