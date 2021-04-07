# React Bootstrap editor

**Rich Text Editor** based on [TypeScript][1], [React][2] & [Bootstrap][3]

[![NPM Dependency](https://david-dm.org/idea2app/React-Bootstrap-editor.svg)][4]
[![CI & CD](https://github.com/idea2app/React-Bootstrap-editor/workflows/CI%20&%20CD/badge.svg)][5]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][6]

## Demo

https://ideapp.dev/React-MobX-Bootstrap-ts/#/component

## Usage

### Installation

#### Shell command

```shell
npm install react-bootstrap-editor \
    react browser-fs-access
```

#### HTML entry

```html
<head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css"
    />
</head>
```

### Initialization

```javascript
import React, { PureComponent } from 'react';
import { Editor, OriginalTools } from 'react-bootstrap-editor';

export class PostEdit extends PureComponent {
    render() {
        return (
            <Editor
                tools={OriginalTools}
                value="<p>test</p>"
                onChange={console.log}
            />
        );
    }
}
```

[1]: https://www.typescriptlang.org/
[2]: https://reactjs.org/
[3]: https://getbootstrap.com/
[4]: https://david-dm.org/idea2app/React-Bootstrap-editor
[5]: https://github.com/idea2app/React-Bootstrap-editor/actions
[6]: https://nodei.co/npm/react-bootstrap-editor/
