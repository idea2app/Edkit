import React from 'react';
import { render } from 'react-dom';

import { Editor, OriginalTools } from '../source';

render(
    <div className="container">
        <Editor tools={OriginalTools} />
    </div>,
    document.querySelector('main')
);
