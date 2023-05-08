import { Component, h } from "preact";
import { formTheme } from "../theme";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CustomEditorProps, CustomEditorState } from "./types";

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
    this.setState({
      editorState,
    });
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
              icon: this.props.boldIcon,
              className: undefined,
            },
            italic: {
              icon: this.props.italicIcon,
              className: "testCouleur",
            },
            underline: {
              icon: this.props.underlineIcon,
              className: undefined,
            },
            superscript: {
              icon: this.props.superscriptIcon,
              className: undefined,
            },
            subscript: {
              icon: this.props.subscriptIcon,
              className: undefined,
            },
          },
          link: {
            options: ["link"],
            link: {
              icon: this.props.linkIcon,
              className: undefined,
            },
            showOpenOptionOnHover: true,
          },
          history: {
            redo: {
              icon: this.props.redoIcon,
              className: undefined,
            },
            undo: {
              icon: this.props.undoIcon,
              className: undefined,
            },
          },
        }}
      />
    );
  }
}

//export const CustomEditor = ({ boldIcon, italicIcon, underlineIcon, superscriptIcon, subscriptIcon, redoIcon, undoIcon, linkIcon  }: CustomEditorProps) => {
