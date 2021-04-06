export interface Tool {
    name: string;
    icon: string;
    tags?: (keyof HTMLElementTagNameMap | 'strike')[];
    stateQuery?: (element: HTMLElement) => boolean;
    keys?: string[];
    inputs?: string[];
    command: (...args: any[]) => any;
}

export const BoldTool: Tool = {
    name: 'Bold',
    icon: 'type-bold',
    tags: ['b', 'strong'],
    keys: ['Ctrl', 'B'],
    command: () => document.execCommand('bold')
};

export const ItalicTool: Tool = {
    name: 'Italic',
    icon: 'type-italic',
    tags: ['i', 'em'],
    keys: ['Ctrl', 'I'],
    command: () => document.execCommand('italic')
};

export const UnderlineTool: Tool = {
    name: 'Underline',
    icon: 'type-underline',
    tags: ['u'],
    keys: ['Ctrl', 'U'],
    command: () => document.execCommand('underline')
};

export const StrikeThroughTool: Tool = {
    name: 'Strike Through',
    icon: 'type-strikethrough',
    tags: ['s', 'del', 'strike'],
    command: () => document.execCommand('strikeThrough')
};

export const LinkTool: Tool = {
    name: 'Link',
    icon: 'link',
    tags: ['a'],
    inputs: ['Path'],
    command: (path: string) => document.execCommand('createLink', true, path)
};

export const IFrameTool: Tool = {
    name: 'iFrame',
    icon: 'window',
    tags: ['iframe'],
    inputs: ['Path'],
    command: (path: string) =>
        document.execCommand(
            'insertHTML',
            true,
            `<iframe style="width: 100%; height: 50vh; border: none" src="${path}"></iframe>`
        )
};

export const ImageTool: Tool = {
    name: 'Image',
    icon: 'image',
    tags: ['img'],
    inputs: ['Path'],
    command: (path: string) => document.execCommand('insertImage', true, path)
};

export const AudioTool: Tool = {
    name: 'Audio',
    icon: 'voicemail',
    tags: ['audio'],
    inputs: ['Path'],
    command: (path: string) =>
        document.execCommand(
            'insertHTML',
            true,
            `<audio controls src="${path}"></audio>`
        )
};

export const VideoTool: Tool = {
    name: 'Video',
    icon: 'camera-video',
    tags: ['video'],
    inputs: ['Path'],
    command: (path: string) =>
        document.execCommand(
            'insertHTML',
            true,
            `<video controls src="${path}"></video>`
        )
};
