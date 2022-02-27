import * as React from "react";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const links = [
    {
      path: "/",
      name: "Горячее",
    },
    {
      path: "/best",
      name: "Лучшее",
    },
    {
      path: "/new",
      name: "Свежее",
    },
    {
      path: "/communities",
      name: "Сообщества",
    },
  ];
  const router = useRouter();

  const activeStyles = {
    borderBottom: 2,
    borderRadius: 0,
    color: "primary.dark",
  };

  return (
    <>
      {links.map((link, idx) => (
        <Link href={link.path} key={idx}>
          <Button
            sx={{
              textTransform: "none",
              color: "text.primary",
              "&:hover": { color: "primary.dark" },
              ...(link.path === router.asPath && activeStyles),
            }}
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </>
  );
};
