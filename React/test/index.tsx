import { render } from 'react-dom';
import { formToJSON } from 'web-utility';
import { configure } from 'mobx';

import { Editor, OriginalTools, ExtraTools } from '../source';

configure({ enforceActions: 'never' });

render(
    <form
        className="container"
        onSubmit={event => {
            event.preventDefault();

            const { content } = formToJSON(event.currentTarget);

            alert(content);
        }}
    >
        <legend>React Bootstrap editor</legend>

        <Editor
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
