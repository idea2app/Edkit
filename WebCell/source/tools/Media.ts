import {
    IFrameTool as FT,
    ImageTool as IT,
    AudioTool as AT,
    VideoTool as VT
} from 'edkit';

import { renderTool } from '../Tool';

export class IFrameTool extends FT {
    icon = 'window';
    render = renderTool;
}

export class ImageTool extends IT {
    icon = 'image';
    render = renderTool;
}

export class AudioTool extends AT {
    icon = 'voicemail';
    render = renderTool;
}

export class VideoTool extends VT {
    icon = 'camera-video';
    render = renderTool;
}
