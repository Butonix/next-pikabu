import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { DownvoteButton, UpvoteButton } from "@components/Buttons/VoteButtons";
import { votePost } from "@rest/post";
import { reloadClientSession } from "@shared/utils/reloadClientSession";

interface PostRatingProps {
  post_id: string;
  rating: number;
  onUnauthAction: () => void;
}

export const PostRating: React.FC<PostRatingProps> = ({
  post_id,
  rating,
  onUnauthAction,
}) => {
  const { data } = useSession();
  const [voteState, setVoteState] = useState(0);
  const [ratingState, setRatingState] = useState(rating);

  useEffect(() => {
    const value = data?.user.rated_posts?.find(
      (e) => e.post_id === post_id
    )?.value;
    if (value) setVoteState(value);
  }, [data]);
  const upvoteHandler = async () => {
    if (voteState === 1) return;
    if (!data?.user) {
      onUnauthAction();
      return;
    }
    await votePost(post_id, { vote: 1 });
    setRatingState((prev) => prev + 1);
    setVoteState((prev) => prev + 1);
    reloadClientSession();
  };
  const downvoteHandler = async () => {
    if (voteState === -1) return null;
    if (!data?.user) {
      onUnauthAction();
      return;
    }
    await votePost(post_id, { vote: -1 });
    setVoteState((prev) => prev - 1);
    setRatingState((prev) => prev - 1);
    reloadClientSession();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UpvoteButton active={voteState === 1} onClick={upvoteHandler} />
      <Typography align="center" color="text.secondary">
        {ratingState}
      </Typography>
      <DownvoteButton active={voteState === -1} onClick={downvoteHandler} />
    </Box>
  );
};
