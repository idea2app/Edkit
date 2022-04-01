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
import { UndoTool, RedoTool, ResetTool, ClearTool } from './Control';

export * from './Text';
export * from './Color';
export * from './Layout';
export * from './Media';
export * from './Control';

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
export const ControlTools = [UndoTool, RedoTool, ResetTool, ClearTool];

export const OriginalTools = [
    ...TextTools,
    ...ColorTools,
    ...LayoutTools,
    ...MediaTools,
    ...ControlTools
];

export default [
    BoldTool,
    ItalicTool,
    UnderlineTool,
    StrikeThroughTool,
    H1Tool,
    H2Tool,
    H3Tool,
    SubscriptTool,
    SuperscriptTool,
    ForeColorTool,
    BackColorTool,
    AlignLeftTool,
    AlignCenterTool,
    AlignRightTool,
    AlignFullTool,
    OrderedListTool,
    UnorderedListTool,
    HorizontalRuleTool,
    ImageTool,
    UndoTool,
    RedoTool,
    ClearTool
]
