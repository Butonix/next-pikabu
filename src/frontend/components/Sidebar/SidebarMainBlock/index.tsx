import React from "react";

import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { NavList } from "./NavList";
import { signIn, signOut, useSession } from "next-auth/react";
import { SidebarAuth } from "../SidebarAuth";
import { SidebarProfile } from "./SidebarProfile";

export const SidebarMainBlock = () => {
  const session = useSession();
  return (
    <Paper variant="outlined" onClick={() => console.log(session)}>
      {session.status === "authenticated" ? (
        <>
          <SidebarProfile user={session.data.user} />
          <Divider />
          <NavList />
        </>
      ) : (
        <SidebarAuth />
      )}
    </Paper>
  );
};
