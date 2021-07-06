import { Tool } from '../Tool';

export abstract class UndoTool extends Tool {
    name = 'Undo';
    command = 'undo';
}

export abstract class RedoTool extends Tool {
    name = 'Redo';
    command = 'redo';
}

export abstract class ResetTool extends Tool {
    name = 'Reset';
    command = 'removeFormat';
}

export abstract class ClearTool extends Tool {
    name = 'Clear';

    execute(editor: HTMLElement) {
        editor.focus();
        document.execCommand('selectAll');
        document.execCommand('delete');
    }
}
