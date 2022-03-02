import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { getCommunityInfo } from "@rest/community";
import { Community } from "@shared/types";
import Image from "next/image";
import Link from "next/link";
import imgplaceholder from "public/placeholder-600x600.jpg";

import React, { useEffect, useState } from "react";

interface CommunityProps {
  community_id: string;
}

export const CommentCommunity: React.FC<CommunityProps> = ({
  community_id,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
    "idle"
  );
  const [community, setCommunity] = useState<Community>();
  useEffect(() => {
    setStatus("loading");
    getCommunityInfo(community_id)
      .then((data) => {
        setCommunity(data);
        setStatus("done");
      })
      .catch((e) => setStatus("error"));
  }, []);
  if (status === "loading")
    return (
      <Paper variant="outlined" sx={{ px: 3, py: 2, display: "flex" }}>
        <Skeleton variant="rectangular" width={50} height={50} />
        <Box sx={{ ml: 1 }}>
          <Skeleton width={125} height={18} />
          <Skeleton width={100} height={18} />
        </Box>
      </Paper>
    );
  return (
    <Paper
      variant="outlined"
      sx={{ px: 3, py: 2, display: "flex" }}
      onClick={() => {
        console.log(community);
      }}
    >
      <Image
        src={imgplaceholder}
        alt={community?.name}
        width={50}
        height={50}
      />
      <Box sx={{ pl: 1 }}>
        <Typography variant="subtitle2">{community?.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          постов {community?.total_posts} • подписчиков{" "}
          {community?.total_followers}
        </Typography>
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Link href={`/communities/${community_id}`}>
          <Button variant="contained" size="medium">
            Перейти
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};
