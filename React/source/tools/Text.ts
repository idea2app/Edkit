import {
    BoldTool as BT,
    ItalicTool as IT,
    UnderlineTool as UT,
    StrikeThroughTool as STT,
    H1Tool as H1T,
    H2Tool as H2T,
    H3Tool as H3T,
    FontSizeDownTool as FSDT,
    FontSizeUpTool as FSUT,
    SubscriptTool as SubST,
    SuperscriptTool as SupST,
    LinkTool as LT
} from 'edkit';

import { renderTool } from '../Tool';

export class BoldTool extends BT {
    icon = 'type-bold';
    render = renderTool;
}

export class ItalicTool extends IT {
    icon = 'type-italic';
    render = renderTool;
}

export class UnderlineTool extends UT {
    icon = 'type-underline';
    render = renderTool;
}

export class StrikeThroughTool extends STT {
    icon = 'type-strikethrough';
    render = renderTool;
}

export class H1Tool extends H1T {
    icon = 'type-h1';
    render = renderTool;
}

export class H2Tool extends H2T {
    icon = 'type-h2';
    render = renderTool;
}

export class H3Tool extends H3T {
    icon = 'type-h3';
    render = renderTool;
}

export class FontSizeDownTool extends FSDT {
    icon = 'sort-alpha-down';
    render = renderTool;
}

export class FontSizeUpTool extends FSUT {
    icon = 'sort-alpha-up';
    render = renderTool;
}

export class SubscriptTool extends SubST {
    icon = 'box-arrow-down-right';
    render = renderTool;
}

export class SuperscriptTool extends SupST {
    icon = 'box-arrow-up-right';
    render = renderTool;
}

export class LinkTool extends LT {
    icon = 'link';
    render = renderTool;
}
