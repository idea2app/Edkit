import {
    UndoTool as UDT,
    RedoTool as RDT,
    ResetTool as RST,
    ClearTool as CT
} from 'edkit';

import { renderTool } from '../Tool';

export class UndoTool extends UDT {
    icon = 'arrow-counterclockwise';
    render = renderTool;
}

export class RedoTool extends RDT {
    icon = 'arrow-clockwise';
    render = renderTool;
}

export class ResetTool extends RST {
    icon = 'eraser';
    render = renderTool;
}

export class ClearTool extends CT {
    icon = 'file-earmark-x';
    render = renderTool;
}
