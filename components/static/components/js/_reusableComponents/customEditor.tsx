import { Component, h } from "preact";
import { formTheme } from "../theme";
import { purifyHTML } from "../functions";

import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { CustomEditorProps, CustomEditorState } from "./types";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export class CustomEditor extends Component<
  CustomEditorProps,
  CustomEditorState
> {
  constructor(props: CustomEditorProps) {
    super(props);

    this.state = {
      editorState: this.init(this.props.value),
      error: false,
      hasFocus: false,
    };
  }

  init = (value: string) => {
    const { contentBlocks, entityMap } = htmlToDraft(purifyHTML(value));
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    return EditorState.createWithContent(contentState);
  };

  onEditorStateChange = (editorState: any) => {
    this.setState(
      {
        editorState,
      },
      () =>
        this.props.setValue(
          purifyHTML(
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
          ),
        ),
    );
  };

  componentWillUpdate(nextProps: Readonly<CustomEditorProps>): void {
    console.info(this.props.value);
    console.info(nextProps.value);
    console.info(this.state.editorState.getCurrentContent().hasText());
    if (
      !this.state.editorState.getCurrentContent().hasText() &&
      nextProps.value
    ) {
      console.info("Initializing editor state");
      // If value is currently empty, initialize with whatever value passed
      this.setState({ editorState: this.init(nextProps.value) });
    }
    if (this.props.value != nextProps.value) {
      console.info("Validating next value");
      const error = !nextProps.validator(nextProps.value);
      this.setState({ error });
    }
  }

  render() {
    const editorStyle = {
      padding: "15px",
      fontFamily: formTheme.typography.body2.fontFamily,
      fontSize: formTheme.typography.body2.fontSize,
      color: formTheme.typography.body2.color,
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

    return (
      <Editor
        // https://github.com/jpuri/react-draft-wysiwyg/issues/652#issuecomment-412786718
        defaultEditorState={this.state.editorState}
        key={this.props.id}
        onEditorStateChange={this.onEditorStateChange}
        wrapperStyle={{
          backgroundColor: "white",
          minHeight: "130px",
          borderRadius: "4px",
          borderColor: this.state.error
            ? formTheme.palette.error.main
            : this.state.hasFocus
            ? formTheme.palette.primary.main
            : formTheme.palette.secondary2.main,
          borderStyle: "solid",
          borderWidth: this.state.hasFocus ? "2px" : "1px",
        }}
        editorStyle={editorStyle}
        editorClassName="editor"
        onBlur={() => this.setState({ hasFocus: false })}
        onFocus={() => this.setState({ hasFocus: true })}
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
