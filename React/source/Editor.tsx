import { Tool } from 'edkit';
import React, {
    createRef,
    PropsWithoutRef,
    PureComponent,
    ClipboardEvent,
    DragEvent
} from 'react';
import {
    Constructor,
    parseDOM,
    walkDOM,
    insertToCursor,
    blobOf
} from 'web-utility';

import { ImageTool, AudioTool, VideoTool, DefaultTools } from './tools';

export type EditorProps = PropsWithoutRef<{
    tools?: { new (...args: any[]): Tool }[];
    defaultValue?: string;
    onChange?(value: string): any;
}>;

interface EditorState {
    toolList: Tool[];
    data: string;
}

export class Editor extends PureComponent<EditorProps, EditorState> {
    static displayName = 'Editor';

    box = createRef<HTMLDivElement>();

    state = {
        toolList: [] as Tool[],
        data: ''
    };

    static getDerivedStateFromProps(
        { tools = DefaultTools, defaultValue }: EditorProps,
        { toolList, data }: EditorState
    ): EditorState {
        return {
            toolList: toolList[0]
                ? toolList
                : tools.map(ToolButton => new ToolButton()),
            data: data || defaultValue
        };
    }

    componentDidMount() {
        document.addEventListener('selectionchange', this.updateTools);
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.updateTools);
    }

    updateTools = () => {
        if (this.box.current === document.activeElement)
            this.setState({ toolList: [...this.state.toolList] });
    };

    async uploadFile(
        Type:
            | Constructor<ImageTool>
            | Constructor<AudioTool>
            | Constructor<VideoTool>,
        data: string | Blob
    ) {
        if (typeof data === 'string' && !/^(data|blob):/.test(data))
            return data;

        const tool = this.state.toolList.find(
            tool => tool instanceof Type
        ) as ImageTool;

        try {
            return await tool?.save(
                typeof data === 'string' ? await blobOf(data) : data
            );
        } catch (error) {
            console.error(error);

            if (typeof data === 'string') return data;
        }
    }

    async clearHTML(markup: string) {
        const fragment = document.createDocumentFragment();

        fragment.append(...parseDOM(markup));

        for (const element of walkDOM<HTMLElement>(
            fragment,
            Node.ELEMENT_NODE
        )) {
            const { style, dataset } = element;

            if (['nowrap', 'pre'].includes(style.whiteSpace))
                style.whiteSpace = 'normal';

            for (const key in dataset) delete dataset[key];

            if (element instanceof HTMLImageElement)
                element.src = await this.uploadFile(ImageTool, element.src);
            else if (element instanceof HTMLAudioElement)
                element.src = await this.uploadFile(AudioTool, element.src);
            else if (element instanceof HTMLVideoElement)
                element.src = await this.uploadFile(VideoTool, element.src);
        }
        return fragment;
    }

    handlePasteDrop = async (event: ClipboardEvent | DragEvent) => {
        event.preventDefault();

        const { currentTarget } = event;

        const list =
            event.type === 'paste'
                ? [...(event as ClipboardEvent).clipboardData.items]
                : [...(event as DragEvent).dataTransfer.items];

        for (const item of list)
            if (item.type === 'text/html') {
                const raw = await new Promise<string>(resolve =>
                    item.getAsString(resolve)
                );
                insertToCursor(await this.clearHTML(raw));
            } else if (item.type.startsWith('image/')) {
                const URI = await this.uploadFile(ImageTool, item.getAsFile());

                if (URI) insertToCursor(...parseDOM(`<img src="${URI}" />`));
            } else if (item.type.startsWith('audio/')) {
                const URI = await this.uploadFile(AudioTool, item.getAsFile());

                if (URI) insertToCursor(...parseDOM(`<audio src="${URI}" />`));
            } else if (item.type.startsWith('video/')) {
                const URI = await this.uploadFile(VideoTool, item.getAsFile());

                if (URI) insertToCursor(...parseDOM(`<video src="${URI}" />`));
            }
        this.props.onChange?.(currentTarget.innerHTML);
    };

    render() {
        const { toolList, data } = this.state,
            { onChange } = this.props;

        return (
            <>
                <header>{toolList.map(tool => tool.render(this.box))}</header>
                <div
                    ref={this.box}
                    className="form-control h-auto"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: data }}
                    onPaste={this.handlePasteDrop}
                    onDrop={this.handlePasteDrop}
                    onInput={({ currentTarget: { innerHTML } }) =>
                        onChange?.(innerHTML)
                    }
                />
            </>
        );
    }
}
