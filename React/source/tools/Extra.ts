import { CopyMarkdownTool as CMDT } from 'edkit';

import { renderTool } from '../Tool';

export class CopyMarkdownTool extends CMDT {
    icon = 'markdown';
    render = renderTool;
}
