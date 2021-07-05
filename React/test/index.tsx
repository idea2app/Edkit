import React from 'react';
import { render } from 'react-dom';
import { OriginalTools } from 'edkit';

import { Editor } from '../source';

render(
    <div className="container">
        <Editor tools={OriginalTools} />
    </div>,
    document.querySelector('main')
);
