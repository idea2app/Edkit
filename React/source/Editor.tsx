import { Tool } from 'edkit';
import React, { createRef, PropsWithoutRef, PureComponent } from 'react';

export type EditorProps = PropsWithoutRef<{
    tools: { new(...args: any[]): Tool }[];
    value?: string;
    onChange?(value: string): any;
}>;

interface EditorState {
    toolList: Tool[];
    data: string;
}

export class Editor extends PureComponent<EditorProps, EditorState> {
    box = createRef<HTMLDivElement>();

    state = {
        toolList: [] as Tool[],
        data: ''
    };

    static getDerivedStateFromProps(
        { tools, value }: EditorProps,
        { toolList, data }: EditorState
    ): EditorState {
        return {
            toolList: toolList[0]
                ? toolList
                : tools.map(ToolButton => new ToolButton()),
            data: data || value
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
                    onInput={({ target }) => {
                        onChange && onChange((target as HTMLElement).innerHTML)
                    }}
                />
            </>
        );
    }
}
