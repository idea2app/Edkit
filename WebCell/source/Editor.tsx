import { EditorComponent, ImageTool, Tool, editor } from 'edkit';
import { computed, observable } from 'mobx';
import {
    WebCellProps,
    WebField,
    component,
    formField,
    observer,
    reaction
} from 'web-cell';
import { Constructor, parseDOM } from 'web-utility';

import { AudioTool, DefaultTools, VideoTool } from './tools';

export interface EditorProps
    extends Pick<WebCellProps<HTMLInputElement>, 'name' | 'defaultValue'> {
    tools?: Constructor<Tool>[];
    onChange?: (event: CustomEvent<string>) => any;
}

export interface HTMLEditor extends WebField<EditorProps>, EditorComponent {}

@component({ tagName: 'html-editor', mode: 'open' })
@formField
@observer
@editor
export class HTMLEditor
    extends HTMLElement
    implements WebField<EditorProps>, EditorComponent
{
    @observable.shallow
    accessor tools: EditorProps['tools'];

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

    protected box: HTMLElement;

    mountedCallback() {
        this.bootTools();

        this.box = parseDOM(
            `<div class="form-control h-auto" contenteditable="true">${this.defaultValue || ''}</div>`
        )[0] as HTMLElement;

        this.box.oninput = () => this.updateValue(this.box.innerHTML);
        this.box.onpaste = this.box.ondrop = this.handlePasteDrop;

        this.append(this.box);

        document.addEventListener('selectionchange', this.updateTools);
    }

    disconnectedCallback() {
        document.removeEventListener('selectionchange', this.updateTools);
    }

    @reaction(({ tools }) => tools)
    bootTools() {
        this.toolList = (this.tools || DefaultTools).map(
            ToolButton => new ToolButton()
        );
    }

    updateTools = () => {
        if (this.box === document.activeElement)
            this.toolList = [...this.toolList];
    };

    updateValue = (markup: string) =>
        this.emit('change', (this.value = markup.trim()));

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
                />
                <header>
                    {this.toolList.map(tool => tool.render(this.box))}
                </header>

                <slot />
            </>
        );
    }
}
