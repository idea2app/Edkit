import { Tool } from 'edkit';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
    createRef,
    InputHTMLAttributes,
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

export interface EditorProps
    extends Pick<
        InputHTMLAttributes<HTMLInputElement>,
        'name' | 'defaultValue'
    > {
    tools?: Constructor<Tool>[];
    onChange?: (value: string) => any;
}

@observer
export class Editor extends PureComponent<EditorProps> {
    static displayName = 'Editor';

    box = createRef<HTMLDivElement>();

    @observable
    accessor toolList: Tool[] = [];

    defaultValue = this.props.defaultValue;

    @observable
    accessor innerValue = this.defaultValue;

    componentDidMount() {
        this.bootTools();

        document.addEventListener('selectionchange', this.updateTools);
    }

    componentDidUpdate({ tools }: Readonly<EditorProps>) {
        if (tools !== this.props.tools) this.bootTools();
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.updateTools);
    }

    bootTools() {
        const { tools = DefaultTools } = this.props;

        this.toolList = tools.map(ToolButton => new ToolButton());
    }

    updateTools = () => {
        if (this.box.current === document.activeElement)
            this.toolList = [...this.toolList];
    };

    updateValue(markup: string) {
        this.innerValue = markup = markup.trim();

        this.props.onChange?.(markup);
    }

    async uploadFile(
        Type:
            | Constructor<ImageTool>
            | Constructor<AudioTool>
            | Constructor<VideoTool>,
        data: string | Blob
    ) {
        if (typeof data === 'string' && !/^(data|blob):/.test(data))
            return data;

        const tool = this.toolList.find(
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

    insertToCursor(raw: string | Node) {
        this.box.current?.focus();

        if (typeof raw === 'string') insertToCursor(...parseDOM(raw));
        else insertToCursor(raw);
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
                this.insertToCursor(await this.clearHTML(raw));
            } else if (item.type.startsWith('image/')) {
                const URI = await this.uploadFile(ImageTool, item.getAsFile());

                if (URI) this.insertToCursor(`<img src="${URI}" />`);
            } else if (item.type.startsWith('audio/')) {
                const URI = await this.uploadFile(AudioTool, item.getAsFile());

                if (URI) this.insertToCursor(`<audio src="${URI}" />`);
            } else if (item.type.startsWith('video/')) {
                const URI = await this.uploadFile(VideoTool, item.getAsFile());

                if (URI) this.insertToCursor(`<video src="${URI}" />`);
            }
        this.updateValue(currentTarget.innerHTML);
    };

    render() {
        const { toolList, defaultValue, innerValue } = this,
            { name } = this.props;

        return (
            <>
                <header>{toolList.map(tool => tool.render(this.box))}</header>
                <div
                    ref={this.box}
                    className="form-control h-auto"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: defaultValue }}
                    onInput={({ currentTarget: { innerHTML } }) =>
                        this.updateValue(innerHTML)
                    }
                    onPaste={this.handlePasteDrop}
                    onDrop={this.handlePasteDrop}
                />
                <input type="hidden" name={name} value={innerValue} />
            </>
        );
    }
}
