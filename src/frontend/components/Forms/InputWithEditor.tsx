import { Box, Button } from "@mui/material";
import * as React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { useTheme } from "@mui/material";

export interface InputWithEditorProps {
  value: string;
  setValue: (value: string) => void;
}

export const InputWithEditor: React.FC<InputWithEditorProps> = ({
  value,
  setValue,
}) => {
  const theme = useTheme();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  // console.log(theme.palette.primary.main);
  // const [editorState, setEditorState] = React.useState<any>();
  return (
    <Box
      id="editor"
      sx={{
        bgcolor: "background.paper",
        py: 2,
        px: 3,
        border: 1,
        borderRadius: 1,
        borderColor: "divider",
        color: "white",
        ".quill": {
          ".ql-picker-label": { color: "white" },

          ".ql-snow .ql-stroke": {
            stroke: "white",
          },
          color: "white",
          ".ql-toolbar": {
            border: 1,
            borderColor: "divider",
          },
          ".ql-container": {
            minHeight: "40ch",
            border: 1,
            borderColor: "divider",
          },
          ".ql-editor": {
            minHeight: "40ch",
          },
        },
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </Box>
  );
};
