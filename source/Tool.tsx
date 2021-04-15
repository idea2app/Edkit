import React from 'react';
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

    execute(...data: any[]) {
        var { inputs } = this,
            values = [];

        if (inputs) {
            const data = inputs.map(input => self.prompt(input));

            if (!data.filter(Boolean)[0]) return;

            values = data;
        }
        document.execCommand(this.command, null, ...values);
    }

    render() {
        const { name, keys, active, icon, usable } = this;

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
                onClick={() => this.execute()}
            >
                <i className={`bi-${icon}`} />
            </button>
        );
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
