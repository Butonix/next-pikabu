import { Box, Divider, Paper, Typography } from "@mui/material";

import React, { ReactNode } from "react";

interface SectionHeaderProps {
  actions?: ReactNode;
  avatar?: ReactNode;
  bgimage?: string;
  children?: ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  actions,
  avatar,
  children,
  bgimage,
}) => {
  return (
    <Paper variant="outlined">
      <Box
        sx={{
          px: 3,
          bgcolor: "background.default",
          height: 140,
          backgroundSize: "700px 454px",
          backgroundImage: bgimage
            ? `url(${bgimage})`
            : "url(https://cs.pikabu.ru/apps/ub/5.0.195/desktop/sprite_96dpi.png)",
        }}
      >
        <Box
          sx={{
            width: 128,
            height: 128,
            position: "relative",
            top: 64,
            // bgcolor: "white",
          }}
        >
          {avatar}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ mx: 3, mt: 2, pt: 6, position: "relative" }}>
        <Typography variant="h5" component="h1">
          vasya22
        </Typography>
        <Box sx={{ position: "absolute", right: 0, top: 0 }}>{actions}</Box>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>{children}</Box>
    </Paper>
  );
};
