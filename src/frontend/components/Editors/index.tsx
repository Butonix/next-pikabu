import { Box, Button } from "@mui/material";
import * as React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { useTheme } from "@mui/material";

export const MyEditor = () => {
  const theme = useTheme();
  console.log(theme.palette.primary.main);
  const [editorState, setEditorState] = React.useState<any>();
  return (
    <Box
      id="editor"
      sx={{
        mb: 10,
        bgcolor: "background.paper",
        p: 2,
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
      <ReactQuill theme="snow" value={editorState} onChange={setEditorState} />

      <Button onClick={() => console.log(editorState)}>Submit</Button>
    </Box>
  );
};
