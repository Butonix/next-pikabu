import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Alert,
  AlertTitle,
  Box,
  Button,
  Grow,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Layout } from "@components/Layout";
import { InputWithEditorProps } from "@components/Forms/InputWithEditor";

import { Community, PostInput, Tag } from "@shared/types";
import { addPost } from "@rest/post";
import { AccessDenied } from "@components/AccessDenied";
import { getTags } from "@rest/tags";
import { getCommunities } from "@rest/community";

const InputWithEditor = dynamic<InputWithEditorProps>(
  () => import("@components/Forms").then((mod) => mod.InputWithEditor),
  { ssr: false }
);

const Add: NextPage = () => {
  const { status } = useSession();

  const [tags, setTags] = useState<Array<Tag>>([]);
  const [tagOptions, setTagOptions] = useState<Array<Tag>>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadingState, setUploadingState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [postId, setPostId] = useState("");
  const [error, setError] = useState("");
  const [communityId, setCommunityId] = useState<string>();
  const [communityOptions, setCommunityOptions] = useState<Array<Community>>(
    []
  );

  useEffect(() => {
    getTags()
      .then((data) => setTagOptions(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getCommunities()
      .then((data) => setCommunityOptions(data))
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadingState("loading");
    const post: PostInput = {
      title,
      summary,
      tags,
      community_id: communityId,
    };

    addPost(post)
      .then((res) => {
        setUploadingState("done");
        setPostId(res._id);
      })
      .catch((e) => {
        setUploadingState("error");
        setError(e.response.data);
      });
  };
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    return <AccessDenied />;
  }
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Grow in={uploadingState === "done" || uploadingState === "error"}>
          <Box>
            {uploadingState === "done" && (
              <Alert variant="filled" severity="success">
                <AlertTitle>Пост был успешно добавлен</AlertTitle>
                <Link href={`/posts/${postId}`} passHref>
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
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              autoComplete="off"
              sx={{
                px: 3,
                fontSize: "1.25rem",
              }}
              id="post-title"
              placeholder="Введите заголовок поста"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </FormControl>

          <InputWithEditor value={summary} setValue={setSummary} />

          <Box sx={{ px: 3, py: 2, bgcolor: "background.paper" }}>
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
                  placeholder="Введите название тэга"
                />
              )}
            />
          </Box>
          <Box sx={{ px: 3, py: 2, bgcolor: "background.paper" }}>
            <Autocomplete
              onChange={(event, value) => {
                event.stopPropagation();
                setCommunityId(value?._id);
              }}
              id="community"
              options={communityOptions}
              getOptionLabel={(option) => option.name}
              renderTags={(value: Community[], getTagProps) =>
                value.map((option: Community) => (
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
                  placeholder="Введите название сообщества (Необязательно)"
                />
              )}
            />
          </Box>

          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: "background",
              display: "flex",
              gap: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <LoadingButton
              loading={uploadingState === "loading"}
              loadingIndicator="Загружаю..."
              type="submit"
              variant="contained"
            >
              Добавить пост
            </LoadingButton>
            <LoadingButton
              loading={uploadingState === "loading"}
              variant="contained"
              color="secondary"
              endIcon={<Delete />}
              onClick={() => {
                console.log(communityId);
              }}
            >
              Сохранить черновик
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default Add;
