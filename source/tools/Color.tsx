import React, { PropsWithoutRef, RefObject } from 'react';

import { getAnchorElement, Tool } from '../Tool';

export type ColorName = 'color' | 'backgroundColor';

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
                className="position-absolute w-100 h-100 rounded-lg"
                style={{
                    left: 0,
                    top: 0,
                    zIndex: -1
                }}
                type="color"
                value={value}
                onChange={({ target: { value } }) =>
                    onChange && onChange(value)
                }
            />
            <button
                className="btn"
                style={{
                    color: type === 'color' ? value : 'lightgray',
                    backgroundColor: type === 'color' ? 'white' : value,
                    borderColor: value
                }}
                onClick={({
                    currentTarget: { previousElementSibling: picker }
                }) => (picker as HTMLInputElement).click()}
            >
                <i className={`bi-${icon}`} />
            </button>
        </span>
    );
}

export abstract class ColorTool extends Tool {
    abstract colorName: ColorName;

    getColor() {
        const box = getAnchorElement(),
            { colorName } = this;

        if (!box) return colorName === 'color' ? '#000000' : '#ffffff';

        const { [colorName]: color } = getComputedStyle(box);

        const [red, green, blue] = color.match(/\d+/g);

        return (
            '#' +
            (+red).toString(16).padStart(2, '0') +
            (+green).toString(16).padStart(2, '0') +
            (+blue).toString(16).padStart(2, '0')
        );
    }

    get active() {
        return !!this.getColor();
    }

    execute(editor: HTMLElement, color: string) {
        this.edit(editor, color);
    }

    render(editor: RefObject<HTMLElement>) {
        const { icon, name, colorName } = this;

        return (
            <ColorSelector
                className="mr-2 mb-2"
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
}

export class ForeColorTool extends ColorTool {
    name = 'Fore Color';
    icon = 'file-earmark-font';
    command = 'foreColor';
    colorName = 'color' as ColorName;
}

export class BackColorTool extends ColorTool {
    name = 'Back Color';
    icon = 'file-earmark-font-fill';
    command = 'backColor';
    colorName = 'backgroundColor' as ColorName;
}
