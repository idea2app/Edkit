import { EditorComponent, ImageTool, Tool, editor } from 'edkit';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { FormComponent, FormComponentProps } from 'mobx-react-helper';
import { createRef } from 'react';
import { Constructor } from 'web-utility';

import { AudioTool, DefaultTools, VideoTool } from './tools';

export interface EditorProps extends FormComponentProps {
    tools?: Constructor<Tool>[];
}

export interface Editor extends EditorComponent {}

@observer
@editor
export class Editor
    extends FormComponent<EditorProps>
    implements EditorComponent
{
    static displayName = 'Editor';

    box = createRef<HTMLDivElement>();

    @observable
    accessor cursorPoint = '';

    @computed
    get toolList(): Tool[] {
        return (this.observedProps.tools || DefaultTools).map(
            ToolButton => new ToolButton()
        );
    }

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

    componentDidMount() {
        super.componentDidMount();

        const { defaultValue } = this.props;

        if (defaultValue != null) this.box.current.innerHTML = defaultValue;

        document.addEventListener('selectionchange', this.updateTools);
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        document.removeEventListener('selectionchange', this.updateTools);
    }

    updateTools = () => {
        if (this.box.current !== document.activeElement) return;

        const { endContainer } = getSelection().getRangeAt(0) || {};
        const { x, y } =
            (endContainer instanceof Element
                ? endContainer
                : endContainer.parentElement
            )?.getBoundingClientRect() || {};

        this.cursorPoint = [x, y] + '';
    };

    updateValue = (markup: string) => (this.innerValue = markup.trim());

    render() {
        // Don't remove unused variable `cursorPoint`, which is used for triggering updates
        const { cursorPoint, toolList, innerValue } = this,
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
