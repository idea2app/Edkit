import { Tool, FileTool } from '../Tool';

export class IFrameTool extends Tool {
    name = 'Embed Web page';
    icon = 'window';
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

export class ImageTool extends FileTool {
    name = 'Image';
    icon = 'image';
    tags = ['img'];
    command = 'insertImage';
}

export class AudioTool extends FileTool {
    name = 'Audio';
    icon = 'voicemail';
    tags = ['audio'];
    command = 'insertHTML';

    codeOf(path: string) {
        return `<audio controls src="${path}"></audio>`;
    }
}

export class VideoTool extends FileTool {
    name = 'Video';
    icon = 'camera-video';
    tags = ['video'];
    command = 'insertHTML';

    codeOf(path: string) {
        return `<video controls src="${path}"></video>`;
    }
}
