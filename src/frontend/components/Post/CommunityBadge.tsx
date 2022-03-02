import { Skeleton, Typography } from "@mui/material";
import { getCommunityInfo } from "@rest/community";
import { Community } from "@shared/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CommunityBadgeProps {
  community_id: string;
}
export const CommunityBadge: React.FC<CommunityBadgeProps> = ({
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
  if (status === "loading") return <Skeleton width={100} />;
  return (
    <Link href={`/communities/${community?._id}`}>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: 14,
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {community?.name}
      </Typography>
    </Link>
  );
};
