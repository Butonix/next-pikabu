import * as React from "react";

import { Header } from "@components/Header";
import { Container, Grid } from "@mui/material";
import { Sidebar } from "@components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  commentsHidden?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  commentsHidden = false,
}) => {
  return (
    <>
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
                <Sidebar />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};
