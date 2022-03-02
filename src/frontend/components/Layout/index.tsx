import * as React from "react";

import NextNProgress from "nextjs-progressbar";

import { Header } from "@components/Header";
import { Container, Grid, useTheme } from "@mui/material";
import { Sidebar } from "@components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  commentsHidden?: boolean;
  sidebarSlot?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  commentsHidden = false,
  sidebarSlot,
}) => {
  const theme = useTheme();
  return (
    <>
      <NextNProgress color={theme.palette.primary.main} />
      <Header />
      <Container sx={{ marginTop: "80px" }}>
        <Grid container>
          <Grid
            item
            xs={commentsHidden ? 12 : 9}
            sx={!commentsHidden ? { paddingRight: 1 } : {}}
          >
            {children}
          </Grid>
          {!commentsHidden ? (
            <>
              <Grid item xs={3} sx={{ paddingLeft: 1 }}>
                <Sidebar slot={sidebarSlot} />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};
