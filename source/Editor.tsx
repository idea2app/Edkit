import React, { createRef, PropsWithoutRef, PureComponent } from 'react';

import { Tool } from './Tool';

export type EditorProps = PropsWithoutRef<{
    tools: { new (...args: any[]): Tool }[];
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

    renderTool = (tool: Tool) => {
        const { name, keys, active, icon, usable } = tool;

        const title = `${name}${
                usable
                    ? keys
                        ? `\n(${keys.join(' + ')})`
                        : ''
                    : '\n(not supported)'
            }`,
            Class = `btn btn-${
                (active ? '' : 'outline-') + 'secondary'
            } mr-2 mb-2`;

        return (
            <button
                key={icon}
                type="button"
                title={title}
                className={Class}
                style={{ cursor: usable ? 'pointer' : 'not-allowed' }}
                disabled={!usable}
                onClick={() => tool.execute()}
            >
                <i className={`bi-${icon}`} />
            </button>
        );
    };

    render() {
        const { toolList, data } = this.state,
            { onChange } = this.props;

        return (
            <>
                <header>{toolList.map(this.renderTool)}</header>
                <div
                    ref={this.box}
                    className="form-control h-auto"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: data }}
                    onInput={({ target }) =>
                        onChange?.((target as HTMLElement).innerHTML)
                    }
                />
            </>
        );
    }
}
