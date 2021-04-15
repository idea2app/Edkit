import {
    BoldTool,
    ItalicTool,
    UnderlineTool,
    StrikeThroughTool,
    H1Tool,
    H2Tool,
    H3Tool,
    FontSizeDownTool,
    FontSizeUpTool,
    SubscriptTool,
    SuperscriptTool,
    LinkTool
} from './Text';
import { ForeColorTool, BackColorTool } from './Color';
import {
    AlignLeftTool,
    AlignCenterTool,
    AlignRightTool,
    AlignFullTool,
    OrderedListTool,
    UnorderedListTool,
    HorizontalRuleTool
} from './Layout';
import { IFrameTool, ImageTool, AudioTool, VideoTool } from './Media';

export * from './Text';
export * from './Color';
export * from './Layout';
export * from './Media';

export const TextTools = [
    BoldTool,
    ItalicTool,
    UnderlineTool,
    StrikeThroughTool,
    H1Tool,
    H2Tool,
    H3Tool,
    FontSizeDownTool,
    FontSizeUpTool,
    SubscriptTool,
    SuperscriptTool,
    LinkTool
];
export const ColorTools = [ForeColorTool, BackColorTool];
export const LayoutTools = [
    AlignLeftTool,
    AlignCenterTool,
    AlignRightTool,
    AlignFullTool,
    OrderedListTool,
    UnorderedListTool,
    HorizontalRuleTool
];
export const MediaTools = [IFrameTool, ImageTool, AudioTool, VideoTool];

export const OriginalTools = [
    ...TextTools,
    ...ColorTools,
    ...LayoutTools,
    ...MediaTools
];
