import { Tool } from '../Tool';

export class UndoTool extends Tool {
    name = 'Undo';
    icon = 'arrow-counterclockwise';
    command = 'undo';
}

export class RedoTool extends Tool {
    name = 'Redo';
    icon = 'arrow-clockwise';
    command = 'redo';
}

export class ResetTool extends Tool {
    name = 'Reset';
    icon = 'eraser';
    command = 'removeFormat';
}

export class ClearTool extends Tool {
    name = 'Clear';
    icon = 'file-earmark-x';

    execute(editor: HTMLElement) {
        editor.focus();
        document.execCommand('selectAll');
        document.execCommand('delete');
    }
}
