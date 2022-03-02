import React from "react";

import { Divider, Paper } from "@mui/material";
import { NavList } from "./NavList";
import { useSession } from "next-auth/react";
import { SidebarAuth } from "../SidebarAuth";
import { SidebarProfile } from "./SidebarProfile";

export const SidebarMainBlock = () => {
  const session = useSession();
  return (
    <Paper variant="outlined">
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
