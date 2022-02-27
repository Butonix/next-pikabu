import React, { useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { NextPage } from "next";

import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Divider,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Layout } from "@components/Layout";

import { CommunityInput } from "@shared/types";

import { addCommunity } from "@rest/community";

const Add: NextPage = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [rules, setRules] = useState("");
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/authorization_required.svg" width={386} height={280} />
          <p>
            Пожалуйста, авторизуйтесь или зарегистрируйтесь для просмотра данной
            страницы
          </p>
        </Box>
      </Layout>
    );
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const community: CommunityInput = {
      name,
      summary,
      rules,
    };
    console.log(community);
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          border: 1,
          borderColor: "divider",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack sx={{ px: 3, py: 2, bgcolor: "background.paper" }} spacing={2}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                autoComplete="off"
                sx={{ fontSize: "0.875rem" }}
                placeholder="Название сообщества"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                autoComplete="off"
                sx={{ fontSize: "0.875rem" }}
                placeholder="Описание сообщества"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                autoComplete="off"
                sx={{ fontSize: "0.875rem" }}
                id="post-title"
                placeholder="Правила сообщества (Необязательно)"
                value={rules}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRules(e.target.value)
                }
              />
            </FormControl>
          </Stack>
          <Divider />
          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: "background",
              display: "flex",
              gap: 2,
            }}
          >
            <Button type="submit" variant="contained">
              СОздать сообщество
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Delete />}
              onClick={() => {
                console.log({ summary, name, rules });
              }}
            >
              Сохранить черновик
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default Add;
