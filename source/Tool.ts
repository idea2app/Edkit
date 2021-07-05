import { fileOpen } from 'browser-fs-access';

export function getAnchorElement() {
    const { anchorNode } = self.getSelection() || {};

    if (anchorNode) return anchorNode.parentElement;
}

export abstract class Tool {
    abstract name: string;
    abstract icon: string;

    tags?: string[];
    keys?: string[];
    command?: string;
    inputs?: string[];

    get usable() {
        const { command } = this;

        return (
            !command ||
            document.queryCommandSupported(command) ||
            document.queryCommandEnabled(command)
        );
    }

    protected getActive() {
        const { command, tags } = this;

        if (tags) {
            const box = getAnchorElement();

            return (
                !!box &&
                box.matches(tags.map(tag => `${tag}, ${tag} *`).join(', '))
            );
        }
        if (command) return document.queryCommandState(command);

        return false;
    }

    get active() {
        return this.getActive();
    }

    get title() {
        const { name, keys, usable } = this;

        return `${name}${
            usable
                ? keys
                    ? `\n(${keys.join(' + ')})`
                    : ''
                : '\n(not supported)'
        }`;
    }

    protected edit(editor: HTMLElement, ...data: any[]) {
        editor.focus();
        document.execCommand(this.command, null, ...data);
    }

    execute(editor: HTMLElement, ...data: any[]) {
        var { inputs } = this,
            values = [];

        if (inputs) {
            const data = inputs.map(input => self.prompt(input));

            if (!data.filter(Boolean)[0]) return;

            values = data;
        }
        this.edit(editor, ...values);
    }

    /**
     * Render a Tool control
     *
     * @param editor An `HTMLElement` object or its wrapper for `[contenteditable="true"]`
     *
     * @returns Virtual DOM of UI engines
     */
    render(editor: any): any {}
}

export abstract class FileTool extends Tool {
    async save(data: Blob) {
        return URL.createObjectURL(data);
    }

    codeOf(path: string) {
        return path;
    }

    async execute(editor: HTMLElement) {
        const path = self.confirm(
            'Confirm to upload a file, or cancel to input a path.'
        )
            ? await this.save(await fileOpen())
            : self.prompt('Path');

        if (path) this.edit(editor, this.codeOf(path));
    }
}
