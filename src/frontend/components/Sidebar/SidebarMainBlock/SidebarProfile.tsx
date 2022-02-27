import { Box, Button, Divider, Typography } from "@mui/material";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

interface SidebarProfileProps {
  user: User;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({ user }) => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <Box
        // onClick={() => console.log(user)}
        sx={{ py: 2, px: 3, bgcolor: "background.default" }}
      >
        {user.name}
        <Button onClick={handleLogout}>Logout</Button>
      </Box>

      <Divider />
      <Box sx={{ py: 2, px: 3 }}>
        <Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 500, display: "inline", mr: 1 }}
          >
            100
          </Typography>
          <Typography
            sx={{ display: "inline", color: "grey.700", fontSize: 14 }}
          >
            рейтинг
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 500, display: "inline", mr: 1 }}
          >
            0
          </Typography>
          <Typography
            sx={{ display: "inline", color: "grey.700", fontSize: 14 }}
          >
            подписчиков
          </Typography>
        </Box>
      </Box>
    </>
  );
};
