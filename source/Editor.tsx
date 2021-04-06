import React, { PropsWithoutRef, PureComponent } from 'react';
import Button from 'react-bootstrap/Button';

import { Tool } from './tools';

export type EditorProps = PropsWithoutRef<{
    tools: Tool[];
    value?: string;
    onChange?(value: string): any;
}>;

interface ToolButton extends Omit<Tool, 'stateQuery'> {
    active: boolean;
}

interface EditorState {
    toolList: ToolButton[];
}

export class Editor extends PureComponent<EditorProps, EditorState> {
    state = {
        toolList: [] as ToolButton[]
    };

    static getDerivedStateFromProps(
        { tools }: EditorProps,
        { toolList }: EditorState
    ): EditorState {
        return {
            toolList: toolList[0]
                ? toolList
                : tools.map(({ stateQuery, ...tool }) => ({
                      ...tool,
                      active: false
                  }))
        };
    }

    componentDidMount() {
        document.addEventListener('selectionchange', this.queryToolState);
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.queryToolState);
    }

    static matchFormat(element: HTMLElement, tags: string[]) {
        return element.matches(tags.map(tag => `${tag}, ${tag} *`).join(', '));
    }

    queryToolState = () => {
        const { tools } = this.props,
            { parentElement } = getSelection().anchorNode;

        const toolList = tools.map(({ tags, stateQuery, ...tool }) => ({
            ...tool,
            active: tags
                ? Editor.matchFormat(parentElement, tags)
                : stateQuery(parentElement)
        }));

        this.setState({ toolList });
    };

    renderTool = ({
        name,
        icon,
        keys,
        active,
        inputs,
        command
    }: ToolButton) => (
        <Button
            key={icon}
            variant={(active ? '' : 'outline-') + 'secondary'}
            className="mr-2"
            title={`${name}${keys ? `\n${keys.join(' + ')}` : ''}`}
            onClick={() => command(...inputs.map(input => self.prompt(input)))}
        >
            <i className={`bi-${icon}`} />
        </Button>
    );

    render() {
        const { toolList } = this.state,
            { value, onChange } = this.props;

        return (
            <>
                <header>{toolList.map(this.renderTool)}</header>
                <div
                    className="form-control h-auto mt-3"
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
