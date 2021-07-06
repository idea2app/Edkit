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

const HeadingCommand = document.queryCommandSupported('heading')
    ? 'heading'
    : 'formatBlock';

export abstract class H1Tool extends Tool {
    name = 'H1';
    tags = ['h1'];
    command = HeadingCommand;

    execute(editor: HTMLElement) {
        this.edit(editor, 'H1');
    }
}

export abstract class H2Tool extends Tool {
    name = 'H2';
    tags = ['h2'];
    command = HeadingCommand;

    execute(editor: HTMLElement) {
        this.edit(editor, 'H2');
    }
}

export abstract class H3Tool extends Tool {
    name = 'H3';
    tags = ['h3'];
    command = HeadingCommand;

    execute(editor: HTMLElement) {
        this.edit(editor, 'H3');
    }
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
