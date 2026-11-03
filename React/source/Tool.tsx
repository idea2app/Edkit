import { RefObject } from 'react';
import { Tool } from 'edkit';

export function renderTool(this: Tool, editor: RefObject<HTMLElement>) {
    const { title, active, icon, usable } = this;

    const Class = `btn-${active ? 'solid' : 'outline'} theme-secondary me-3 mb-3`;

    return (
        <button
            key={icon}
            type="button"
            title={title}
            className={Class}
            style={{ cursor: usable ? 'pointer' : 'not-allowed' }}
            disabled={!usable}
            onClick={event => {
                event.preventDefault();

                if (editor.current) this.execute(editor.current);
            }}
        >
            <i className={`bi-${icon}`} />
        </button>
    );
}
