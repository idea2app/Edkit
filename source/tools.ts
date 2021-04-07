import { Tool } from './Tool';

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
    name = 'Strike Through';
    icon = 'type-strikethrough';
    tags = ['s', 'del', 'strike'];
    command = 'strikeThrough';
}

export class H1Tool extends Tool {
    name = 'H1';
    icon = 'type-h1';
    tags = ['h1'];
    command = 'heading';

    execute() {
        return document.execCommand('heading', null, 'H1');
    }
}

export class H2Tool extends Tool {
    name = 'H2';
    icon = 'type-h2';
    tags = ['h2'];
    command = 'heading';

    execute() {
        return document.execCommand('heading', null, 'H2');
    }
}

export class H3Tool extends Tool {
    name = 'H3';
    icon = 'type-h3';
    tags = ['h3'];
    command = 'heading';

    execute() {
        return document.execCommand('heading', null, 'H3');
    }
}

export class LinkTool extends Tool {
    name = 'Link';
    icon = 'link';
    tags = ['a'];
    inputs = ['Path'];
    command = 'createLink';
}

export class IFrameTool extends Tool {
    name = 'iFrame';
    icon = 'window';
    tags = ['iframe'];

    execute() {
        const path = self.prompt('Path');

        return document.execCommand(
            'insertHTML',
            true,
            `<iframe style="width: 100%; height: 50vh; border: none" src="${path}"></iframe>`
        );
    }
}

export class ImageTool extends Tool {
    name = 'Image';
    icon = 'image';
    tags = ['img'];
    inputs = ['Path'];
    command = 'insertImage';
}

export class AudioTool extends Tool {
    name = 'Audio';
    icon = 'voicemail';
    tags = ['audio'];

    execute() {
        const path = self.prompt('Path');

        return document.execCommand(
            'insertHTML',
            true,
            `<audio controls src="${path}"></audio>`
        );
    }
}

export class VideoTool extends Tool {
    name = 'Video';
    icon = 'camera-video';
    tags = ['video'];

    execute() {
        const path = self.prompt('Path');

        return document.execCommand(
            'insertHTML',
            true,
            `<video controls src="${path}"></video>`
        );
    }
}
