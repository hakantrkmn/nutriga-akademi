import BubbleMenuExt from "@tiptap/extension-bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import FloatingMenuExt from "@tiptap/extension-floating-menu";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";
import { ResizableImage } from "tiptap-extension-resizable-image";

export const getEditorExtensions = (placeholder: string) => [
  StarterKit.configure({ codeBlock: false, horizontalRule: false }),
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Image.configure({ HTMLAttributes: { class: "tiptap-image" } }),
  ResizableImage.configure({
    allowBase64: true,
    defaultWidth: 200,
    defaultHeight: 200,
    HTMLAttributes: { class: "tiptap-image-resizable" },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: "tiptap-link" },
  }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  CodeBlockLowlight.configure({ lowlight: createLowlight() }),
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
  Underline,
  TextStyle,
  Color.configure({ types: ["textStyle"] }),
  FontFamily.configure({ types: ["textStyle"] }),
  FontSize.configure({ types: ["textStyle"] }),
  Subscript,
  Superscript,
  TaskList,
  TaskItem.configure({ nested: true }),
  Youtube.configure({ controls: false, nocookie: true }),
  HorizontalRule,
  Mention.configure({ HTMLAttributes: { class: "mention" } }),
  CharacterCount,
  BubbleMenuExt,
  FloatingMenuExt,
  Placeholder.configure({ placeholder }),
];

export const colors = [
  "#000000",
  "#333333",
  "#666666",
  "#999999",
  "#CCCCCC",
  "#FFFFFF",
  "#FF0000",
  "#FF6600",
  "#FFCC00",
  "#00FF00",
  "#0066FF",
  "#6600FF",
  "#FF0066",
  "#FF3366",
  "#FF6699",
  "#FF99CC",
  "#FFCCFF",
  "#CC99FF",
  "#9966FF",
  "#6633FF",
  "#3300FF",
  "#0033FF",
  "#0066CC",
  "#0099FF",
  "#00CCFF",
  "#00FFFF",
  "#00FFCC",
  "#00FF99",
  "#00FF66",
  "#00FF33",
  "#66FF00",
  "#99FF00",
  "#CCFF00",
  "#FFFF00",
  "#FF9900",
  "#FF3300",
  "#CC0000",
  "#990000",
  "#660000",
  "#330000",
  "#8B4513",
  "#FF1493",
];
