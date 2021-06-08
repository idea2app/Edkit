# React Bootstrap editor

Lightweight **Rich Text Editor** based on [TypeScript][1], [React][2] & [Bootstrap][3]

[![NPM Dependency](https://david-dm.org/idea2app/React-Bootstrap-editor.svg)][4]
[![CI & CD](https://github.com/idea2app/React-Bootstrap-editor/workflows/CI%20&%20CD/badge.svg)][5]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][6]

## Demo

https://ideapp.dev/React-MobX-Bootstrap-ts/#/component

## Tools

### Text

1. Bold
2. Italic
3. Underline
4. Strike through
5. H1
6. H2
7. H3
8. Font Size down
9. Font Size up
10. Subscript
11. Superscript
12. Link

### Color

1. Fore Color
2. Back Color

### Layout

1. Align Left
2. Align Center
3. Align Right
4. Align Full
5. Ordered list
6. Unordered list
7. Horizontal rule

### Media

1. Embed Web page
2. Image
3. Audio
4. Video

### Control

1. Undo
2. Redo
3. Reset
4. Clear

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
