# BootCell HTML editor

Lightweight **Rich Text Editor** based on [Edkit][1], [WebCell][2] & [Bootstrap][3]

[![NPM Dependency](https://img.shields.io/librariesio/release/npm/boot-cell-editor)][4]

[![NPM](https://nodei.co/npm/boot-cell-editor.png?downloads=true&downloadRank=true&stars=true)][5]

## Demo

https://idea2app.github.io/Edkit/WebCell/

## Tools

https://github.com/idea2app/Edkit#tools

## Usage

### Installation

#### Shell command

```shell
npm install web-cell boot-cell-editor
```

#### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "moduleResolution": "Node",
        "useDefineForClassFields": true,
        "jsx": "react-jsx",
        "jsxImportSource": "dom-renderer"
    }
}
```

### Initialization

```javascript
import { component } from 'web-cell';
import { Editor } from 'boot-cell-editor';

@component({ tagName: 'post-edit' })
export class PostEdit extends HTMLElement {
    render() {
        return (
            <Editor
                name="content"
                defaultValue="<p>test</p>"
                onChange={console.log}
            />
        );
    }
}
```

[1]: https://github.com/idea2app/Edkit
[2]: https://web-cell.dev/
[3]: https://getbootstrap.com/
[4]: https://libraries.io/npm/boot-cell-editor
[5]: https://npm.im/boot-cell-editor/
