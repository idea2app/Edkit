import { getAnchorElement, Tool } from '../Tool';

export type ColorName = 'color' | 'backgroundColor';

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
