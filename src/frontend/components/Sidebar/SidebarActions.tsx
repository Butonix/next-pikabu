import { Add, GroupAddRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export const SidebarActions = () => {
  const router = useRouter();

  return (
    <Box>
      <Button
        onClick={() => router.push("/add")}
        variant="contained"
        fullWidth
        startIcon={<Add />}
        sx={{ mb: 1 }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
          Добавить пост
        </Typography>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        startIcon={<GroupAddRounded />}
      >
        <Typography
          sx={{ fontSize: 12 }}
          onClick={() => router.push("/communities/add")}
        >
          Создать сообщество
        </Typography>
      </Button>
    </Box>
  );
};
