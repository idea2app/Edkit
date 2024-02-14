import { FC, WebCellProps } from 'web-cell';
import {
    ColorName,
    ColorTool,
    ForeColorTool as FCT,
    BackColorTool as BCT
} from 'edkit';

export interface ColorSelectorProps
    extends Omit<WebCellProps<HTMLSpanElement>, 'onChange'> {
    icon: string;
    type: ColorName;
    value?: string;
    onChange?: (color: string) => any;
}

export const ColorSelector: FC<ColorSelectorProps> = ({
    className = '',
    title,
    type,
    value,
    onChange,
    icon
}) => (
    <span
        className={`d-inline-block align-middle position-relative ${className}`}
        title={title}
    >
        <input
            className="position-absolute w-100 h-100 start-0 top-0 z-n1 rounded-3"
            type="color"
            value={value}
            onChange={({ target }) =>
                onChange?.((target as HTMLInputElement).value)
            }
        />
        <button
            className="btn"
            style={{
                color: type === 'color' ? value : 'lightgray',
                backgroundColor: type === 'color' ? 'white' : value,
                borderColor: value
            }}
            onClick={event => {
                event.preventDefault();
                (
                    (event.currentTarget as HTMLButtonElement)
                        .previousElementSibling as HTMLInputElement
                ).click();
            }}
        >
            <i className={`bi-${icon}`} />
        </button>
    </span>
);

export function renderColorTool(this: ColorTool, editor: HTMLElement) {
    const { icon, name, colorName } = this;

    return (
        <ColorSelector
            className="me-2 mb-2"
            key={icon}
            title={name}
            icon={icon}
            type={colorName}
            value={this.getColor()}
            onChange={color => this.execute(editor, color)}
        />
    );
}

export class ForeColorTool extends FCT {
    icon = 'file-earmark-font';
    render = renderColorTool;
}

export class BackColorTool extends BCT {
    icon = 'file-earmark-font-fill';
    render = renderColorTool;
}
