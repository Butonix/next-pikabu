import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";

export const CommentTreeLoading = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ cursor: "pointer", mr: 2 }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton sx={{ borderRadius: 3 }} width={120} height={14} />
        </Box>
        <Skeleton sx={{ borderRadius: 3 }} width={400} height={14} />
        <Skeleton sx={{ borderRadius: 3 }} width={320} height={14} />
        <Skeleton sx={{ borderRadius: 3 }} width={360} height={14} />
        <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
        <Box sx={{ display: "flex" }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ cursor: "pointer", mr: 2 }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton sx={{ borderRadius: 3 }} width={120} height={14} />
            </Box>
            <Skeleton sx={{ borderRadius: 3 }} width={400} height={14} />
            <Skeleton sx={{ borderRadius: 3 }} width={320} height={14} />
            <Skeleton sx={{ borderRadius: 3 }} width={360} height={14} />
            <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
            <Box sx={{ display: "flex" }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ cursor: "pointer", mr: 2 }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton sx={{ borderRadius: 3 }} width={120} height={14} />
                </Box>
                <Skeleton sx={{ borderRadius: 3 }} width={400} height={14} />
                <Skeleton sx={{ borderRadius: 3 }} width={320} height={14} />
                <Skeleton sx={{ borderRadius: 3 }} width={360} height={14} />
                <Skeleton sx={{ borderRadius: 3 }} width={80} height={14} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
