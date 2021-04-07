export abstract class Tool {
    abstract name: string;
    abstract icon: string;

    tags?: string[];
    keys?: string[];
    command?: string;
    inputs?: string[];

    get usable() {
        const { command } = this;

        return !command || document.queryCommandSupported(command);
    }

    get active() {
        const { tags } = this,
            element = self.getSelection()?.anchorNode?.parentElement;

        return (
            tags &&
            element?.matches(tags.map(tag => `${tag}, ${tag} *`).join(', '))
        );
    }

    execute() {
        const data = this.inputs?.map(input => self.prompt(input)) || [];

        return document.execCommand(this.command, null, ...data);
    }
}
