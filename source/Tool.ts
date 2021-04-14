import { fileOpen } from 'browser-fs-access';

export abstract class Tool {
    abstract name: string;
    abstract icon: string;

    tags?: string[];
    keys?: string[];
    command?: string;
    inputs?: string[];

    static get anchorElement() {
        return self.getSelection()?.anchorNode?.parentElement;
    }

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

        if (tags)
            return Tool.anchorElement?.matches(
                tags.map(tag => `${tag}, ${tag} *`).join(', ')
            );
        if (command) return document.queryCommandState(command);

        return false;
    }

    get active() {
        return this.getActive();
    }

    execute() {
        var { inputs } = this,
            values = [];

        if (inputs) {
            const data = inputs.map(input => self.prompt(input));

            if (!data.filter(Boolean)[0]) return;

            values = data;
        }
        document.execCommand(this.command, null, ...values);
    }
}

export type AlignMode = 'left' | 'center' | 'right' | 'justify';

export abstract class AlignTool extends Tool {
    abstract align: AlignMode;

    get active() {
        if (super.getActive()) return true;

        const { anchorElement: box } = Tool;

        return !!box && getComputedStyle(box).textAlign === this.align;
    }
}

export abstract class FileTool extends Tool {
    async save(data: Blob) {
        return URL.createObjectURL(data);
    }

    codeOf(path: string) {
        return path;
    }

    async execute() {
        const path = self.confirm(
            'Confirm to upload a file, or cancel to input a path.'
        )
            ? await this.save(await fileOpen())
            : self.prompt('Path');

        document.execCommand(this.command, null, this.codeOf(path));
    }
}
