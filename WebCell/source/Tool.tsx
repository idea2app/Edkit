import { Tool } from 'edkit';

export function renderTool(this: Tool, editor: HTMLElement) {
    const { title, active, icon, usable } = this;

    const Class = `btn btn-${
        (active ? '' : 'outline-') + 'secondary'
    } me-2 mb-2`;

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

                this.execute(editor);
            }}
        >
            <i className={`bi-${icon}`} />
        </button>
    );
}
