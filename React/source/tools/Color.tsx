import React, { PropsWithoutRef, RefObject } from 'react';
import {
    ColorName,
    ColorTool,
    ForeColorTool as FCT,
    BackColorTool as BCT
} from 'edkit';

export type ColorSelectorProps = PropsWithoutRef<{
    className?: string;
    title?: string;
    icon: string;
    type: ColorName;
    value?: string;
    onChange?(color: string): any;
}>;

export function ColorSelector({
    className,
    title,
    type,
    value,
    onChange,
    icon
}: ColorSelectorProps) {
    return (
        <span
            className={`d-inline-block align-middle position-relative ${className}`}
            title={title}
        >
            <input
                className="position-absolute w-100 h-100 rounded-3"
                style={{ left: 0, top: 0, zIndex: -1 }}
                type="color"
                value={value}
                onChange={({ target: { value } }) => onChange?.(value)}
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
                        event.currentTarget
                            .previousElementSibling as HTMLInputElement
                    ).click();
                }}
            >
                <i className={`bi-${icon}`} />
            </button>
        </span>
    );
}

export function renderColorTool(
    this: ColorTool,
    editor: RefObject<HTMLElement>
) {
    const { icon, name, colorName } = this;

    return (
        <ColorSelector
            className="me-2 mb-2"
            key={icon}
            title={name}
            icon={icon}
            type={colorName}
            value={this.getColor()}
            onChange={color =>
                editor.current && this.execute(editor.current, color)
            }
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
