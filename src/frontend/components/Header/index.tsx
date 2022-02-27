import * as React from "react";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Box,
  Button,
  Container,
  IconButton,
  Slide,
  Typography,
  InputBase,
} from "@mui/material";
import {
  SearchRounded,
  PersonRounded,
  Notifications,
} from "@mui/icons-material";

import { NavBar } from "./NavBar";
import styled from "@emotion/styled";
import Image from "next/image";

import logo from "/public/logo.png";

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HideOnScroll {...props}>
      <AppBar
        elevation={0}
        variant="outlined"
        sx={{
          height: "64px",
          border: "none",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ gap: 1, alignItems: "stretch" }}>
            <Link href="#">
              <Box
                sx={{
                  alignSelf: "center",
                  width: 140,
                  height: 64,
                  py: 2,
                  cursor: "pointer",
                }}
              >
                <Image
                  width="128"
                  height="32"
                  // layout="fixed"
                  src={logo}
                  alt="logo"
                />
                {/* <Typography>Pikabu</Typography> */}
              </Box>
            </Link>
            <NavBar />

            <Toolbar sx={{ marginLeft: "auto", gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <SearchRounded />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <Notifications />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "primary.dark",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <PersonRounded />
              </IconButton>
            </Toolbar>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
