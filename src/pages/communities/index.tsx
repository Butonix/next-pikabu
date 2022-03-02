import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";

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
import { getCommunities } from "@rest/community";
import { Community } from "@shared/types";

interface CommunitiesPageProps {
  communities: Community[];
}

const CommunitiesPage: NextPage<CommunitiesPageProps> = ({ communities }) => {
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
            {communities.map((comm) => (
              <CommunityCard
                key={comm._id}
                community_id={comm._id}
                image={"https://picsum.photos/200/200"}
                title={comm.name}
                tags={comm.tags}
                total_posts={comm.total_posts}
                total_users={comm.total_followers}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
};

export default CommunitiesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const communities = await getCommunities();

  return {
    props: {
      communities: communities,
    },
  };
};
