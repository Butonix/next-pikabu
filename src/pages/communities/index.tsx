import { useState } from "react";
import { NextPage } from "next";

import { Layout } from "@components/Layout";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { CommunityCard } from "@components/Community";

const Communities: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            px: 3,
            py: 2,
            // bgcolor: "background.paper",
            // border: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small">Все сообщества</Button>

          <Button size="small" variant="contained">
            Создать сообщество
          </Button>
        </Paper>
        <Box>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              autoComplete="off"
              sx={{
                px: 3,
                fontSize: "1rem",
              }}
              id="post-title"
              placeholder="Поиск"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" size="small">
                    Поиск
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            px: 3,
            py: 2,
            // bgcolor: "background.paper",
            // border: 1,
          }}
        >
          <Stack spacing={2}>
            <CommunityCard
              image={"https://picsum.photos/200/200"}
              title="Сообщество"
              postCount={1}
              subCount={10}
            />
            <CommunityCard
              image={"https://picsum.photos/200/205"}
              title="Сообщество"
              postCount={1}
              subCount={10}
            />
            <CommunityCard
              image={"https://picsum.photos/205/200"}
              title="Сообщество"
              postCount={1}
              subCount={10}
            />
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Communities;
