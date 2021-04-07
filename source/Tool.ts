import { fileOpen } from 'browser-fs-access';

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

    get active() {
        const { command, tags } = this;

        if (tags) {
            const element = self.getSelection()?.anchorNode?.parentElement;

            return element?.matches(
                tags.map(tag => `${tag}, ${tag} *`).join(', ')
            );
        } else if (command) return document.queryCommandState(command);
        else return false;
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
