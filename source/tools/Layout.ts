import { getAnchorElement, Tool } from '../Tool';

export type AlignMode = 'left' | 'center' | 'right' | 'justify';

export abstract class AlignTool extends Tool {
    abstract align: AlignMode;

    get active() {
        if (super.getActive()) return true;

        const box = getAnchorElement();

        return !!box && getComputedStyle(box).textAlign === this.align;
    }
}

export abstract class AlignLeftTool extends AlignTool {
    name = 'Align Left';
    command = 'justifyLeft';
    align = 'left' as AlignMode;
}

export abstract class AlignCenterTool extends AlignTool {
    name = 'Align Center';
    command = 'justifyCenter';
    align = 'center' as AlignMode;
}

export abstract class AlignRightTool extends AlignTool {
    name = 'Align Right';
    command = 'justifyRight';
    align = 'right' as AlignMode;
}

export abstract class AlignFullTool extends AlignTool {
    name = 'Align Full';
    command = 'justifyFull';
    align = 'justify' as AlignMode;
}

export abstract class OrderedListTool extends Tool {
    name = 'Ordered list';
    tags = ['ol'];
    command = 'insertOrderedList';
}

export abstract class UnorderedListTool extends Tool {
    name = 'Unordered list';
    tags = ['ul'];
    command = 'insertUnorderedList';
}

export abstract class HorizontalRuleTool extends Tool {
    name = 'Horizontal rule';
    tags = ['hr'];
    command = 'insertHorizontalRule';
}
