# React Bootstrap editor

Lightweight **Rich Text Editor** based on [Edkit][1], [React][2] & [Bootstrap][3]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][4]

## Demo

https://ideapp.dev/React-MobX-Bootstrap-ts/#/component

## Tools

https://github.com/idea2app/Edkit#tools

## Usage

### Installation

#### Shell command

```shell
npm install react react-bootstrap-editor
```

#### HTML entry

```html
<head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
    />
</head>
```

### Initialization

```javascript
import { PureComponent } from 'react';
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

[1]: https://github.com/idea2app/Edkit/
[2]: https://reactjs.org/
[3]: https://getbootstrap.com/
[4]: https://nodei.co/npm/react-bootstrap-editor/
