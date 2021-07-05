# React Bootstrap editor

Lightweight **Rich Text Editor** based on [Edkit][1], [React][2] & [Bootstrap][3]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][4]

## Demo

https://ideapp.dev/React-MobX-Bootstrap-ts/#/component

## Tools

https://ideapp.dev/Edkit/modules/tools.html

## Usage

### Installation

#### Shell command

```shell
npm install react edkit react-bootstrap-editor
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
import { OriginalTools } from 'edkit';
import { Editor } from 'react-bootstrap-editor';

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

[1]: https://github.com/idea2app/Edkit/
[2]: https://reactjs.org/
[3]: https://getbootstrap.com/
[4]: https://nodei.co/npm/react-bootstrap-editor/
