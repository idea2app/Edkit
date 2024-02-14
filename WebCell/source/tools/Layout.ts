import {
    AlignLeftTool as ALT,
    AlignCenterTool as ACT,
    AlignRightTool as ART,
    AlignFullTool as AFT,
    OrderedListTool as OLT,
    UnorderedListTool as ULT,
    HorizontalRuleTool as HRT
} from 'edkit';

import { renderTool } from '../Tool';

export class AlignLeftTool extends ALT {
    icon = 'text-left';
    render = renderTool;
}

export class AlignCenterTool extends ACT {
    icon = 'text-center';
    render = renderTool;
}

export class AlignRightTool extends ART {
    icon = 'text-right';
    render = renderTool;
}

export class AlignFullTool extends AFT {
    icon = 'justify';
    render = renderTool;
}

export class OrderedListTool extends OLT {
    icon = 'list-ol';
    render = renderTool;
}

export class UnorderedListTool extends ULT {
    icon = 'list-ul';
    render = renderTool;
}

export class HorizontalRuleTool extends HRT {
    icon = 'reception-0';
    render = renderTool;
}
