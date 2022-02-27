import { Box } from "@mui/material";
import React from "react";
import { SidebarActions } from "./SidebarActions";
import { SidebarComment } from "./SidebarComment";
import { SidebarMainBlock } from "./SidebarMainBlock";

export const Sidebar = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <SidebarMainBlock />
      <SidebarActions />
      <SidebarComment />
    </Box>
  );
};
