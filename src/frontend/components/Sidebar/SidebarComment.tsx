import {
  Avatar,
  Box,
  Card,
  Divider,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export const SidebarComment = () => {
  return (
    <Paper variant="outlined">
      <Box sx={{ py: 2, px: 3, bgcolor: "background.default" }}>
        <Typography variant="h6" sx={{ fontSize: 14 }}>
          Комментарий дня
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ py: 2, px: 3 }}>
        <Box>
          <Link href="#">
            <Typography
              color="primary"
              sx={{
                fontSize: 14,
                cursor: "pointer",
                mb: 1,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Lorem lorem lorem ipsum. lorem!!
            </Typography>
          </Link>
          <Typography sx={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, esse
            eum error libero itaque distinctio! Lorem ipsum dolor sit amet.
          </Typography>
          <Box
            sx={{
              display: "flex",
              fontSize: 12,
              gap: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography color="text.secondary" sx={{ fontSize: 12 }}>
              +2183
            </Typography>
            <Avatar sx={{ height: 20, width: 20 }}>L</Avatar>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              Lorem
            </Typography>
            <Typography color="text.secondary" noWrap sx={{ fontSize: 12 }}>
              lorem ipsum lorem
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
