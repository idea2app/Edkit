import {
    Constructor,
    blobOf,
    insertToCursor,
    parseDOM,
    walkDOM
} from 'web-utility';

import { AudioTool, ImageTool, VideoTool } from './tools/Media';

export type DataTransferEvent = Pick<
    Event,
    'type' | 'currentTarget' | 'preventDefault'
> &
    (Pick<ClipboardEvent, 'clipboardData'> | Pick<DragEvent, 'dataTransfer'>);

export interface EditorComponent {
    imageTool: ImageTool | undefined;
    audioTool: AudioTool | undefined;
    videoTool: VideoTool | undefined;

    uploadFile: (
        tool: ImageTool | AudioTool | VideoTool,
        data: string | Blob
    ) => Promise<string>;

    clearHTML: (markup: string) => Promise<DocumentFragment>;

    handlePasteDrop: (event: DataTransferEvent) => Promise<void>;
}

export const editor = <T extends Constructor<any>>(
    Class: T,
    {}: ClassDecoratorContext
) =>
    class EditorTrait extends Class implements EditorComponent {
        declare imageTool: ImageTool | undefined;
        declare audioTool: AudioTool | undefined;
        declare videoTool: VideoTool | undefined;

        async uploadFile(
            tool: ImageTool | AudioTool | VideoTool,
            data: string | Blob
        ) {
            if (typeof data === 'string' && !/^(data|blob):/.test(data))
                return data;

            try {
                return await tool.save(
                    typeof data === 'string' ? await blobOf(data) : data
                );
            } catch (error) {
                console.error(error);

                if (typeof data === 'string') return data;
            }
        }

        async clearHTML(markup: string) {
            const { imageTool, audioTool, videoTool } = this,
                fragment = document.createDocumentFragment();

            fragment.append(...parseDOM(markup));

            for (const element of walkDOM<HTMLElement>(
                fragment,
                Node.ELEMENT_NODE
            )) {
                const { style, dataset } = element;

                if (['nowrap', 'pre'].includes(style.whiteSpace))
                    style.whiteSpace = 'normal';

                for (const key in dataset) delete dataset[key];

                if (element instanceof HTMLImageElement && imageTool)
                    element.src = await this.uploadFile(imageTool, element.src);
                else if (element instanceof HTMLAudioElement && audioTool)
                    element.src = await this.uploadFile(audioTool, element.src);
                else if (element instanceof HTMLVideoElement && videoTool)
                    element.src = await this.uploadFile(videoTool, element.src);
            }
            return fragment;
        }

        handlePasteDrop = async (event: DataTransferEvent) => {
            event.preventDefault();

            const root = event.currentTarget as HTMLElement;
            const list =
                event.type === 'paste'
                    ? [...(event as ClipboardEvent).clipboardData.items]
                    : [...(event as DragEvent).dataTransfer.items];
            const { imageTool, audioTool, videoTool } = this;

            root.focus();

            for (const item of list)
                if (item.type === 'text/html') {
                    const raw = await new Promise<string>(resolve =>
                        item.getAsString(resolve)
                    );
                    insertToCursor(await this.clearHTML(raw));
                } else if (item.type.startsWith('image/') && imageTool) {
                    const URI = await this.uploadFile(
                        imageTool,
                        item.getAsFile()
                    );
                    if (URI)
                        insertToCursor(parseDOM(`<img src="${URI}" />`)[0]);
                } else if (item.type.startsWith('audio/') && audioTool) {
                    const URI = await this.uploadFile(
                        audioTool,
                        item.getAsFile()
                    );
                    if (URI)
                        insertToCursor(parseDOM(`<audio src="${URI}" />`)[0]);
                } else if (item.type.startsWith('video/') && videoTool) {
                    const URI = await this.uploadFile(
                        videoTool,
                        item.getAsFile()
                    );
                    if (URI)
                        insertToCursor(parseDOM(`<video src="${URI}" />`)[0]);
                }
            this.updateValue(root.innerHTML);
        };
    };
