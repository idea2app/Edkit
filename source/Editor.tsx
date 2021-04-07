import React, { PropsWithoutRef, PureComponent } from 'react';

import { Tool } from './Tool';

export type EditorProps = PropsWithoutRef<{
    tools: { new (...args: any[]): Tool }[];
    value?: string;
    onChange?(value: string): any;
}>;

interface EditorState {
    toolList: Tool[];
}

export class Editor extends PureComponent<EditorProps, EditorState> {
    state = {
        toolList: [] as Tool[]
    };

    static getDerivedStateFromProps(
        { tools }: EditorProps,
        { toolList }: EditorState
    ): EditorState {
        return {
            toolList: toolList[0]
                ? toolList
                : tools.map(ToolButton => new ToolButton())
        };
    }

    componentDidMount() {
        document.addEventListener('selectionchange', this.updateTools);
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.updateTools);
    }

    updateTools = () => this.setState({ toolList: [...this.state.toolList] });

    renderTool = (tool: Tool) => {
        const { name, keys, active, icon, usable } = tool;

        const title = `${name}${
                usable
                    ? keys
                        ? `\n(${keys.join(' + ')})`
                        : ''
                    : '\n(not supported)'
            }`,
            Class = `btn btn-${(active ? '' : 'outline-') + 'secondary'} mr-2`;

        return (
            <button
                key={icon}
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
        const { toolList } = this.state,
            { value, onChange } = this.props;

        return (
            <>
                <header>{toolList.map(this.renderTool)}</header>
                <div
                    className="form-control h-auto mt-2"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: value }}
                    onInput={({ target }) =>
                        onChange?.((target as HTMLElement).innerHTML)
                    }
                />
            </>
        );
    }
}
