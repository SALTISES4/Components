import { Component, h } from "preact";
import { formTheme } from "../theme";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CustomEditorProps, CustomEditorState } from "./types";

import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs"; // Will be needed when editing an initial value

export class CustomEditor extends Component<
  CustomEditorProps,
  CustomEditorState
> {
  constructor(props: CustomEditorProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState: any) => {
    console.log(editorState);
    this.setState(
      {
        editorState,
      },
      () =>
        this.props.setValue(
          DOMPurify.sanitize(
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
            {
              USE_PROFILES: { html: true },
            },
          ),
        ),
    );
  };

  render() {
    const wrapperStyle = {
      backgroundColor: "white",
      minHeight: "130px",
      border: "solid 1px",
      borderRadius: "4px",
      borderColor: formTheme.palette.secondary2.main,
    };
    const editorStyle = {
      padding: "15px",
      fontFamily: "Open Sans, sans-serif",
      fontSize: "14px",
      color: "#515159",
      position: "inherit",
      minHeight: "90px", //wrapper width - toolbar width
      boxSizing: "border-box",
    };
    const toolbarStyle = {
      visibility: "visible",
      display: "flex",
      backgroundColor: formTheme.palette.secondary1.main,
      borderRadius: "4px 4px 0px 0px",
      borderBottom: "solid 1px",
      borderColor: formTheme.palette.secondary2.main,
      alignItems: "center",
    };

    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        wrapperStyle={wrapperStyle}
        editorStyle={editorStyle}
        editorClassName="editor"
        toolbarStyle={toolbarStyle}
        toolbar={{
          options: ["history", "inline", "link"],
          inline: {
            inDropdown: false,
            options: [
              "bold",
              "italic",
              "underline",
              "superscript",
              "subscript",
            ],
            bold: {
              icon: this.props.EditorIcons.boldIcon,
              className: undefined,
            },
            italic: {
              icon: this.props.EditorIcons.italicIcon,
              className: "testCouleur",
            },
            underline: {
              icon: this.props.EditorIcons.underIcon,
              className: undefined,
            },
            superscript: {
              icon: this.props.EditorIcons.superIcon,
              className: undefined,
            },
            subscript: {
              icon: this.props.EditorIcons.subIcon,
              className: undefined,
            },
          },
          link: {
            options: ["link"],
            link: {
              icon: this.props.EditorIcons.linkIcon,
              className: undefined,
            },
            showOpenOptionOnHover: true,
          },
          history: {
            redo: {
              icon: this.props.EditorIcons.redoIcon,
              className: undefined,
            },
            undo: {
              icon: this.props.EditorIcons.undoIcon,
              className: undefined,
            },
          },
        }}
      />
    );
  }
}

//export const CustomEditor = ({ boldIcon, italicIcon, underlineIcon, superscriptIcon, subscriptIcon, redoIcon, undoIcon, linkIcon  }: CustomEditorProps) => {
