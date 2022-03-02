import React from "react";
import { Box } from "@mui/material";
import { SidebarActions } from "./SidebarActions";
import { SidebarComment } from "./SidebarComment";
import { SidebarMainBlock } from "./SidebarMainBlock";

interface SidebarProps {
  slot: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ slot }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 8 }}>
      <SidebarMainBlock />
      <SidebarActions />
      <SidebarComment />
      {slot}
    </Box>
  );
};
