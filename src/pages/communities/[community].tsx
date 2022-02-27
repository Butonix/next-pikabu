import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

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

const CommunityPage: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { community } = router.query;
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            px: 3,
            py: 2,

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small">{community}</Button>

          <Button size="small" variant="contained">
            Создать сообщество
          </Button>
        </Paper>
      </Box>
    </Layout>
  );
};

export default CommunityPage;
