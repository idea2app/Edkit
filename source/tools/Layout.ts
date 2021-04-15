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

export class AlignLeftTool extends AlignTool {
    name = 'Align Left';
    icon = 'text-left';
    command = 'justifyLeft';
    align = 'left' as AlignMode;
}

export class AlignCenterTool extends AlignTool {
    name = 'Align Center';
    icon = 'text-center';
    command = 'justifyCenter';
    align = 'center' as AlignMode;
}

export class AlignRightTool extends AlignTool {
    name = 'Align Right';
    icon = 'text-right';
    command = 'justifyRight';
    align = 'right' as AlignMode;
}

export class AlignFullTool extends AlignTool {
    name = 'Align Full';
    icon = 'justify';
    command = 'justifyFull';
    align = 'justify' as AlignMode;
}

export class OrderedListTool extends Tool {
    name = 'Ordered list';
    icon = 'list-ol';
    tags = ['ol'];
    command = 'insertOrderedList';
}

export class UnorderedListTool extends Tool {
    name = 'Unordered list';
    icon = 'list-ul';
    tags = ['ul'];
    command = 'insertUnorderedList';
}

export class HorizontalRuleTool extends Tool {
    name = 'Horizontal rule';
    icon = 'reception-0';
    tags = ['hr'];
    command = 'insertHorizontalRule';
}
