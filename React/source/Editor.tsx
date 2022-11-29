import { Tool } from 'edkit';
import React, {
    createRef,
    PropsWithoutRef,
    PureComponent,
    ClipboardEvent
} from 'react';
import { parseDOM, walkDOM, insertToCursor } from 'web-utility';

import { DefaultTools } from './tools';

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

    clearPasted = async (event: ClipboardEvent) => {
        event.preventDefault();

        const { currentTarget } = event;

        for (const item of event.clipboardData.items)
            if (item.type === 'text/html') {
                const markup = await new Promise<string>(resolve =>
                        item.getAsString(resolve)
                    ),
                    fragment = document.createDocumentFragment();

                fragment.append(...parseDOM(markup));

                for (const { style, dataset } of walkDOM<HTMLElement>(
                    fragment,
                    Node.ELEMENT_NODE
                )) {
                    if (['nowrap', 'pre'].includes(style.whiteSpace))
                        style.whiteSpace = 'normal';

                    for (const key in dataset) delete dataset[key];
                }
                insertToCursor(fragment);
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
                    onPaste={this.clearPasted}
                    onInput={({ currentTarget: { innerHTML } }) =>
                        onChange?.(innerHTML)
                    }
                />
            </>
        );
    }
}
