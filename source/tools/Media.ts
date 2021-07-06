import { Tool, FileTool } from '../Tool';

export abstract class IFrameTool extends Tool {
    name = 'Embed Web page';
    tags = ['iframe'];
    command = 'insertHTML';

    execute(editor: HTMLElement) {
        const path = self.prompt('Path');

        if (path)
            this.edit(
                editor,
                `<iframe style="width: 100%; height: 50vh; border: none" src="${path}"></iframe>`
            );
    }
}

export abstract class ImageTool extends FileTool {
    name = 'Image';
    tags = ['img'];
    command = 'insertImage';
}

export abstract class AudioTool extends FileTool {
    name = 'Audio';
    tags = ['audio'];
    command = 'insertHTML';

    codeOf(path: string) {
        return `<audio controls src="${path}"></audio>`;
    }
}

export abstract class VideoTool extends FileTool {
    name = 'Video';
    tags = ['video'];
    command = 'insertHTML';

    codeOf(path: string) {
        return `<video controls src="${path}"></video>`;
    }
}
