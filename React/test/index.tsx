import React from 'react';
import { render } from 'react-dom';

import { Editor, OriginalTools } from '../source';

render(
    <form className="container">
        <Editor tools={OriginalTools} />
    </form>,
    document.querySelector('main')
);
