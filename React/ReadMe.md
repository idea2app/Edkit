# React Bootstrap editor

Lightweight **Rich Text Editor** based on [Edkit][1], [React][2] & [Bootstrap][3]

[![NPM Dependency](https://img.shields.io/librariesio/release/npm/react-bootstrap-editor)][4]

[![NPM](https://nodei.co/npm/react-bootstrap-editor.png?downloads=true&downloadRank=true&stars=true)][5]

## Demo

https://idea2app.github.io/Edkit/React/

## Tools

https://github.com/idea2app/Edkit#tools

## Versions

|  SemVer  |  branch  |    status    | ES decorator |    MobX     | Edkit |
| :------: | :------: | :----------: | :----------: | :---------: | :---: |
|  `>=2`   | `master` | ✅developing |   stage-3    |  `>=6.11`   |  v1   |
| `>=1 <2` | `master` | ❌deprecated |   stage-2    | `>=4 <6.11` |  v1   |
|   `<1`   |  `v0.x`  | ❌deprecated |              |             |       |

## Usage

### Installation

#### Shell command

```shell
npm install react react-bootstrap-editor
```

#### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "moduleResolution": "Node",
        "useDefineForClassFields": true,
        "experimentalDecorators": false,
        "jsx": "react-jsx"
    }
}
```

#### HTML entry

```html
<head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
    />
</head>
```

### Initialization

```javascript
import { PureComponent } from 'react';
import { Editor } from 'react-bootstrap-editor';

export class PostEdit extends PureComponent {
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

[1]: https://github.com/idea2app/Edkit/
[2]: https://reactjs.org/
[3]: https://getbootstrap.com/
[4]: https://libraries.io/npm/react-bootstrap-editor
[5]: https://nodei.co/npm/react-bootstrap-editor/
