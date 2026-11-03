import { Tool } from 'edkit';

export function renderTool(this: Tool, editor: HTMLElement) {
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
            onClick={(event: MouseEvent) => {
                event.preventDefault();

                this.execute(editor);
            }}
        >
            <i className={`bi-${icon}`} />
        </button>
    );
}
