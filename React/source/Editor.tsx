import { EditorComponent, ImageTool, Tool, editor } from 'edkit';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { InputHTMLAttributes, Component, createRef } from 'react';
import { Constructor, parseDOM } from 'web-utility';

import { AudioTool, DefaultTools, VideoTool } from './tools';

export interface EditorProps
    extends Pick<
        InputHTMLAttributes<HTMLInputElement>,
        'name' | 'defaultValue'
    > {
    tools?: Constructor<Tool>[];
    onChange?: (value: string) => any;
}

export interface Editor extends EditorComponent {}

@observer
@editor
export class Editor extends Component<EditorProps> implements EditorComponent {
    static displayName = 'Editor';

    box = createRef<HTMLDivElement>();

    @observable
    accessor toolList: Tool[] = [];

    @computed
    get imageTool() {
        return this.toolList.find(
            tool => tool instanceof ImageTool
        ) as ImageTool;
    }

    @computed
    get audioTool() {
        return this.toolList.find(
            tool => tool instanceof AudioTool
        ) as AudioTool;
    }

    @computed
    get videoTool() {
        return this.toolList.find(
            tool => tool instanceof VideoTool
        ) as VideoTool;
    }

    defaultValue = this.props.defaultValue;

    @observable
    accessor innerValue = this.defaultValue;

    componentDidMount() {
        this.bootTools();

        if (this.defaultValue != null)
            this.box.current.append(...parseDOM(this.defaultValue + ''));

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

    render() {
        const { toolList, innerValue } = this,
            { name } = this.props;

        return (
            <>
                <header>{toolList.map(tool => tool.render(this.box))}</header>
                <div
                    ref={this.box}
                    className="form-control h-auto"
                    contentEditable
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
