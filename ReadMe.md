# Edkit

Lightweight **Rich Text Editor** toolkit based on [TypeScript][1]

[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/Edkit.svg)][2]
[![CI & CD](https://github.com/idea2app/Edkit/actions/workflows/main.yml/badge.svg)][3]

[![NPM](https://nodei.co/npm/edkit.png?downloads=true&downloadRank=true&stars=true)][4]

## Demo

https://idea2app.github.io/React-MobX-Bootstrap-ts/#/component

## Usage

### Application developers

1. [React + Bootstrap](https://github.com/idea2app/Edkit/tree/master/React/)
2. WebCell + Bootstrap

### Library developers

[Example with React](https://github.com/idea2app/Edkit/tree/master/React/source/)

## Features

### Editor class decorator

`@edkit` is compatible with Web components, React & other kinds of class components.

#### Web components

```tsx
import { editor, EditorComponent } from 'edkit';

export interface HTMLEditor extends EditorComponent {}

@editor
export class HTMLEditor extends HTMLElement implements EditorComponent {
    // your class members...
}
```

#### React

```tsx
import { Component } from 'react';
import { editor, EditorComponent } from 'edkit';

export interface HTMLEditor extends EditorComponent {}

@editor
export class HTMLEditor extends Component implements EditorComponent {
    // your class members...
}
```

### Tool base classes

#### Text

1. [Bold](https://idea2app.github.io/Edkit/classes/tools_text.boldtool.html)
2. [Italic](https://idea2app.github.io/Edkit/classes/tools_text.italictool.html)
3. [Underline](https://idea2app.github.io/Edkit/classes/tools_text.underlinetool.html)
4. [Strike through](https://idea2app.github.io/Edkit/classes/tools_text.strikethroughtool.html)
5. [H1](https://idea2app.github.io/Edkit/classes/tools_text.h1tool.html)
6. [H2](https://idea2app.github.io/Edkit/classes/tools_text.h2tool.html)
7. [H3](https://idea2app.github.io/Edkit/classes/tools_text.h3tool.html)
8. [Font Size down](https://idea2app.github.io/Edkit/classes/tools_text.fontsizedowntool.html)
9. [Font Size up](https://idea2app.github.io/Edkit/classes/tools_text.fontsizeuptool.html)
10. [Subscript](https://idea2app.github.io/Edkit/classes/tools_text.subscripttool.html)
11. [Superscript](https://idea2app.github.io/Edkit/classes/tools_text.superscripttool.html)
12. [Link](https://idea2app.github.io/Edkit/classes/tools_text.linktool.html)

#### Color

1. [Fore Color](https://idea2app.github.io/Edkit/classes/tools_color.forecolortool.html)
2. [Back Color](https://idea2app.github.io/Edkit/classes/tools_color.backcolortool.html)

#### Layout

1. [Align Left](https://idea2app.github.io/Edkit/classes/tools_layout.alignlefttool.html)
2. [Align Center](https://idea2app.github.io/Edkit/classes/tools_layout.aligncentertool.html)
3. [Align Right](https://idea2app.github.io/Edkit/classes/tools_layout.alignrighttool.html)
4. [Align Full](https://idea2app.github.io/Edkit/classes/tools_layout.alignfulltool.html)
5. [Ordered list](https://idea2app.github.io/Edkit/classes/tools_layout.orderedlisttool.html)
6. [Unordered list](https://idea2app.github.io/Edkit/classes/tools_layout.unorderedlisttool.html)
7. [Horizontal rule](https://idea2app.github.io/Edkit/classes/tools_layout.horizontalruletool.html)

#### Media

1. [Embed Web page](https://idea2app.github.io/Edkit/classes/tools_media.iframetool.html)
2. [Image](https://idea2app.github.io/Edkit/classes/tools_media.imagetool.html)
3. [Audio](https://idea2app.github.io/Edkit/classes/tools_media.audiotool.html)
4. [Video](https://idea2app.github.io/Edkit/classes/tools_media.videotool.html)

#### Control

1. [Undo](https://idea2app.github.io/Edkit/classes/tools_control.undotool.html)
2. [Redo](https://idea2app.github.io/Edkit/classes/tools_control.redotool.html)
3. [Reset](https://idea2app.github.io/Edkit/classes/tools_control.resettool.html)
4. [Clear](https://idea2app.github.io/Edkit/classes/tools_control.cleartool.html)

[1]: https://www.typescriptlang.org/
[2]: https://libraries.io/npm/edkit
[3]: https://github.com/idea2app/Edkit/actions/workflows/main.yml
[4]: https://nodei.co/npm/edkit/
