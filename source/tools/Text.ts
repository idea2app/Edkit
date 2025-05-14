import { Tool } from '../Tool';

export abstract class BoldTool extends Tool {
    name = 'Bold';
    tags = ['b', 'strong'];
    keys = ['Ctrl', 'B'];
    command = 'bold';
}

export abstract class ItalicTool extends Tool {
    name = 'Italic';
    tags = ['i', 'em'];
    keys = ['Ctrl', 'I'];
    command = 'italic';
}

export abstract class UnderlineTool extends Tool {
    name = 'Underline';
    tags = ['u'];
    keys = ['Ctrl', 'U'];
    command = 'underline';
}

export abstract class StrikeThroughTool extends Tool {
    name = 'Strike through';
    tags = ['s', 'del', 'strike'];
    command = 'strikeThrough';
}

export abstract class HeadingTool extends Tool {
    command = document.queryCommandSupported('heading')
        ? 'heading'
        : 'formatBlock';

    execute(editor: HTMLElement) {
        this.edit(editor, this.name);
    }
}

export abstract class H1Tool extends HeadingTool {
    name = 'H1';
    tags = ['h1'];
}

export abstract class H2Tool extends HeadingTool {
    name = 'H2';
    tags = ['h2'];
}

export abstract class H3Tool extends HeadingTool {
    name = 'H3';
    tags = ['h3'];
}

export abstract class FontSizeDownTool extends Tool {
    name = 'Font Size down';
    tags = ['small'];
    command = 'decreaseFontSize';
}

export abstract class FontSizeUpTool extends Tool {
    name = 'Font Size up';
    tags = ['big'];
    command = 'increaseFontSize';
}

export abstract class SubscriptTool extends Tool {
    name = 'Subscript';
    tags = ['sub'];
    command = 'subscript';
}

export abstract class SuperscriptTool extends Tool {
    name = 'Superscript';
    tags = ['sup'];
    command = 'superscript';
}

export abstract class LinkTool extends Tool {
    name = 'Link';
    tags = ['a'];
    inputs = ['Path'];
    command = 'createLink';
}
