import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { NextPage } from "next";

import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Divider,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Grow,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Layout } from "@components/Layout";

import { CommunityInput, Tag } from "@shared/types";

import { addCommunity } from "@rest/community";
import { AccessDenied } from "@components/AccessDenied";
import { getTags } from "@rest/tags";
import Link from "next/link";

const Add: NextPage = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [rules, setRules] = useState("");
  const { status } = useSession();

  const [tags, setTags] = useState<Array<Tag>>([]);
  const [tagOptions, setTagOptions] = useState<Array<Tag>>([]);
  const [uploadingState, setUploadingState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [communityId, setCommunityId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTags()
      .then((data) => setTagOptions(data))
      .catch((e) => console.error(e));
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    return <AccessDenied />;
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadingState("loading");
    const community: CommunityInput = {
      name,
      summary,
      rules,
      tags,
    };
    addCommunity(community)
      .then((res) => {
        setUploadingState("done");
        setCommunityId(res._id);
      })
      .catch((e) => {
        setUploadingState("error");
        setError(e.response.data);
      });
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
        {uploadingState !== "idle" && (
          <Grow in={uploadingState === "done" || uploadingState === "error"}>
            <Box>
              {uploadingState === "done" && (
                <Alert variant="filled" severity="success">
                  <AlertTitle>Сообщество было успешно создано</AlertTitle>
                  <Link href={`/communities/${communityId}`} passHref>
                    <Typography
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Открыть
                    </Typography>
                  </Link>
                </Alert>
              )}
              {uploadingState === "error" && (
                <Alert variant="filled" severity="error">
                  <AlertTitle>Ошибка</AlertTitle>
                  {error}
                </Alert>
              )}
            </Box>
          </Grow>
        )}
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
            <Box>
              <Autocomplete
                onChange={(event, value: Tag[]) => {
                  event.stopPropagation();
                  setTags(value);
                }}
                multiple
                id="tags-filled"
                options={tagOptions}
                getOptionLabel={(option) => option.name}
                renderTags={(value: Tag[], getTagProps) =>
                  value.map((option: Tag) => (
                    <Typography
                      key={option._id}
                      sx={{ px: 1.5, fontSize: "0.75rem" }}
                    >
                      {option.name}
                    </Typography>
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Введите тэг"
                  />
                )}
              />
            </Box>
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
                console.log({ summary, name, rules, tags });
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
