# React Bootstrap editor

**Rich Text Editor** based on [React][1] & [Bootstrap][2]

[![NPM Dependency](https://david-dm.org/idea2app/React-Bootstrap-editor.svg)][3]
[![CI & CD](https://github.com/idea2app/React-Bootstrap-editor/workflows/CI%20&%20CD/badge.svg)][4]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][5]

## Usage

```shell
npm install react-bootstrap-editor \
    react react-bootstrap
```

```jsx
import React, { PureComponent } from 'react';
import {
    Editor,
    BoldTool,
    ItalicTool,
    UnderlineTool,
    StrikeThroughTool,
    ImageTool,
    LinkTool,
    AudioTool,
    VideoTool,
    IFrameTool
} from 'react-bootstrap-editor';

export class PostEdit extends PureComponent {
    render() {
        return (
            <Editor
                tools={[
                    BoldTool,
                    ItalicTool,
                    UnderlineTool,
                    StrikeThroughTool,
                    LinkTool,
                    IFrameTool,
                    ImageTool,
                    AudioTool,
                    VideoTool
                ]}
                value="<p>test</p>"
                onChange={console.log}
            />
        );
    }
}
```

[1]: https://reactjs.org/
[2]: https://getbootstrap.com/
[3]: https://david-dm.org/idea2app/React-Bootstrap-editor
[4]: https://github.com/idea2app/React-Bootstrap-editor/actions
[5]: https://nodei.co/npm/react-bootstrap-editor/
