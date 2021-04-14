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
    AlignLeftTool,
    AlignCenterTool,
    AlignRightTool,
    AlignFullTool,
    LinkTool,
    OrderedListTool,
    UnorderedListTool,
    HorizontalRuleTool
} from './Text';
import { IFrameTool, ImageTool, AudioTool, VideoTool } from './Media';

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
    AlignLeftTool,
    AlignCenterTool,
    AlignRightTool,
    AlignFullTool,
    LinkTool,
    OrderedListTool,
    UnorderedListTool,
    HorizontalRuleTool
];
export const MediaTools = [IFrameTool, ImageTool, AudioTool, VideoTool];

export default [...TextTools, ...MediaTools];
