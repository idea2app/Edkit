# Edkit

Lightweight **Rich Text Editor** toolkit based on [TypeScript][1]

[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/Edkit.svg)][2]
[![CI & CD](https://github.com/idea2app/Edkit/actions/workflows/main.yml/badge.svg)][3]

[![NPM](https://nodei.co/npm/edkit.png?downloads=true&downloadRank=true&stars=true)][4]

## Demo

https://idea2app.github.io/Edkit/React/

## Usage

### Application developers

1. [React + Bootstrap](https://github.com/idea2app/Edkit/tree/master/React/)
2. [WebCell + Bootstrap](https://github.com/idea2app/Edkit/tree/master/WebCell/)

### Library developers

[Example with React](https://github.com/idea2app/Edkit/tree/master/React/source/)

## Features

### Editor class decorator

`@editor` is compatible with [Web components][5], [React][6] & other kinds of **class components**.

#### Web components

```tsx
import { EditorComponent, editor } from 'edkit';

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

1. [Bold](https://idea2app.github.io/Edkit/classes/BoldTool.html)
2. [Italic](https://idea2app.github.io/Edkit/classes/ItalicTool.html)
3. [Underline](https://idea2app.github.io/Edkit/classes/UnderlineTool.html)
4. [Strike through](https://idea2app.github.io/Edkit/classes/StrikeThroughTool.html)
5. [H1](https://idea2app.github.io/Edkit/classes/H1Tool.html)
6. [H2](https://idea2app.github.io/Edkit/classes/H2Tool.html)
7. [H3](https://idea2app.github.io/Edkit/classes/H3Tool.html)
8. [Font Size down](https://idea2app.github.io/Edkit/classes/FontSizeDownTool.html)
9. [Font Size up](https://idea2app.github.io/Edkit/classes/FontSizeUpTool.html)
10. [Subscript](https://idea2app.github.io/Edkit/classes/SubscriptTool.html)
11. [Superscript](https://idea2app.github.io/Edkit/classes/SuperscriptTool.html)
12. [Link](https://idea2app.github.io/Edkit/classes/LinkTool.html)

#### Color

1. [Fore Color](https://idea2app.github.io/Edkit/classes/ForeColorTool.html)
2. [Back Color](https://idea2app.github.io/Edkit/classes/BackColorTool.html)

#### Layout

1. [Align Left](https://idea2app.github.io/Edkit/classes/AlignLeftTool.html)
2. [Align Center](https://idea2app.github.io/Edkit/classes/AlignCenterTool.html)
3. [Align Right](https://idea2app.github.io/Edkit/classes/AlignRightTool.html)
4. [Align Full](https://idea2app.github.io/Edkit/classes/AlignFullTool.html)
5. [Ordered list](https://idea2app.github.io/Edkit/classes/OrderedListTool.html)
6. [Unordered list](https://idea2app.github.io/Edkit/classes/UnorderedListTool.html)
7. [Horizontal rule](https://idea2app.github.io/Edkit/classes/HorizontalRuleTool.html)

#### Media

1. [Embed Web page](https://idea2app.github.io/Edkit/classes/IFrameTool.html)
2. [Image](https://idea2app.github.io/Edkit/classes/ImageTool.html)
3. [Audio](https://idea2app.github.io/Edkit/classes/AudioTool.html)
4. [Video](https://idea2app.github.io/Edkit/classes/VideoTool.html)

#### Control

1. [Undo](https://idea2app.github.io/Edkit/classes/UndoTool.html)
2. [Redo](https://idea2app.github.io/Edkit/classes/RedoTool.html)
3. [Reset](https://idea2app.github.io/Edkit/classes/ResetTool.html)
4. [Clear](https://idea2app.github.io/Edkit/classes/ClearTool.html)

#### Extra

1. [Copy Markdown](https://idea2app.github.io/Edkit/classes/CopyMarkdownTool.html)

[1]: https://www.typescriptlang.org/
[2]: https://libraries.io/npm/edkit
[3]: https://github.com/idea2app/Edkit/actions/workflows/main.yml
[4]: https://nodei.co/npm/edkit/
[5]: https://www.webcomponents.org/
[6]: https://react.dev/
