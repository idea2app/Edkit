import { Tool } from '../Tool';

export class BoldTool extends Tool {
    name = 'Bold';
    icon = 'type-bold';
    tags = ['b', 'strong'];
    keys = ['Ctrl', 'B'];
    command = 'bold';
}

export class ItalicTool extends Tool {
    name = 'Italic';
    icon = 'type-italic';
    tags = ['i', 'em'];
    keys = ['Ctrl', 'I'];
    command = 'italic';
}

export class UnderlineTool extends Tool {
    name = 'Underline';
    icon = 'type-underline';
    tags = ['u'];
    keys = ['Ctrl', 'U'];
    command = 'underline';
}

export class StrikeThroughTool extends Tool {
    name = 'Strike through';
    icon = 'type-strikethrough';
    tags = ['s', 'del', 'strike'];
    command = 'strikeThrough';
}

const HeadingCommand = document.queryCommandSupported('heading')
    ? 'heading'
    : 'formatBlock';

export class H1Tool extends Tool {
    name = 'H1';
    icon = 'type-h1';
    tags = ['h1'];
    command = HeadingCommand;

    execute() {
        return document.execCommand(this.command, null, 'H1');
    }
}

export class H2Tool extends Tool {
    name = 'H2';
    icon = 'type-h2';
    tags = ['h2'];
    command = HeadingCommand;

    execute() {
        return document.execCommand(this.command, null, 'H2');
    }
}

export class H3Tool extends Tool {
    name = 'H3';
    icon = 'type-h3';
    tags = ['h3'];
    command = HeadingCommand;

    execute() {
        return document.execCommand(this.command, null, 'H3');
    }
}

export class FontSizeDownTool extends Tool {
    name = 'Font Size down';
    icon = 'sort-alpha-down';
    tags = ['small'];
    command = 'decreaseFontSize';
}

export class FontSizeUpTool extends Tool {
    name = 'Font Size up';
    icon = 'sort-alpha-up';
    tags = ['big'];
    command = 'increaseFontSize';
}

export class SubscriptTool extends Tool {
    name = 'Subscript';
    icon = 'box-arrow-down-right';
    tags = ['sub'];
    command = 'subscript';
}

export class SuperscriptTool extends Tool {
    name = 'Superscript';
    icon = 'box-arrow-up-right';
    tags = ['sup'];
    command = 'superscript';
}

export class LinkTool extends Tool {
    name = 'Link';
    icon = 'link';
    tags = ['a'];
    inputs = ['Path'];
    command = 'createLink';
}
