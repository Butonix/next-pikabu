import React, { useState } from "react";

import dynamic from "next/dynamic";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Layout } from "@components/Layout";
import { InputWithEditorProps } from "@components/Forms/InputWithEditor";

import { PostInput } from "@shared/types";
import { addPost } from "@rest/post";

const InputWithEditor = dynamic<InputWithEditorProps>(
  import("@components/Forms").then((mod) => mod.InputWithEditor),
  { ssr: false }
);

const Add: NextPage = () => {
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

  const [tags, setTags] = useState<Array<Tag>>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const post: PostInput = {
      title,
      summary,
      tag_ids: ["1"],
      // tags,
    };

    addPost(post).then((res) => console.log(res));
  };
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              options={tagsOptions}
              getOptionLabel={(option) => option.title}
              renderTags={(value: Tag[], getTagProps) =>
                value.map((option: Tag) => (
                  <Typography
                    key={option.id}
                    sx={{ px: 1.5, fontSize: "0.75rem" }}
                  >
                    {option.title}
                  </Typography>
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
          {/* <Box sx={{ px: 3, py: 2, bgcolor: "background.paper" }}>
            <Autocomplete
              id="community"
              options={tagsOptions.map((option) => option.title)}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Favorites"
                />
              )}
            />
          </Box> */}

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
            <Button type="submit" variant="contained">
              Добавить пост
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Delete />}
              onClick={() => {
                console.log(summary);
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

interface Tag {
  title: string;
  id: number;
}

const tagsOptions: Array<Tag> = [
  { title: "Lorem", id: 1 },
  { title: "Ipsum", id: 2 },
  { title: "dolorem", id: 3 },
];
