import React from "react";

import { Box, Button, List, ListItem } from "@mui/material";

import Link from "next/link";

export const NavList = () => {
  const navOptions = [
    { path: "/answers", name: "Ответы" },
    { path: "/comments", name: "Комментарии" },
    { path: "/liked", name: "Оценки" },
    { path: "/saved-stories", name: "Сохраненное" },
  ];
  return (
    <Box>
      <List>
        {navOptions.map((obj) => (
          <ListItem disablePadding key={obj.path}>
            <Link href={obj.path}>
              <Button
                fullWidth
                sx={{
                  px: 3,
                  textTransform: "none",
                  color: "text.secondary",
                  borderLeft: 2,
                  borderColor: "transparent",

                  "&:hover": {
                    color: "primary.dark",
                    background: "none",
                    borderLeft: 2,
                    borderColor: "primary",
                  },
                  borderRadius: 0,
                  justifyContent: "start",
                }}
              >
                {obj.name}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
