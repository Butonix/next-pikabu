import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { DownvoteButton, UpvoteButton } from "@components/Buttons/VoteButtons";
import { voteComment } from "@rest/comment";
import { reloadClientSession } from "@shared/utils/reloadClientSession";

interface CommentRatingProps {
  comment_id: string;
  rating: number;
  onUnauthAction: () => void;
}

export const CommentRating: React.FC<CommentRatingProps> = ({
  comment_id,
  rating,
  onUnauthAction,
}) => {
  const { data } = useSession();
  const [voteState, setVoteState] = useState(0);
  const [ratingState, setRatingState] = useState(rating);
  const value = data?.user.rated_comments?.find(
    (e) => e.comment_id === comment_id
  )?.value;
  useEffect(() => {
    if (value) setVoteState(value);
  }, [value]);
  const upvoteHandler = async () => {
    if (voteState === 1) return;
    if (!data?.user) {
      onUnauthAction();
      return;
    }
    await voteComment(comment_id, { vote: 1 });
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
    await voteComment(comment_id, { vote: -1 });
    setVoteState((prev) => prev - 1);
    setRatingState((prev) => prev - 1);
    reloadClientSession();
  };
  return (
    <>
      <UpvoteButton
        size="small"
        sx={{ mx: -2.75 }}
        active={voteState === 1}
        onClick={upvoteHandler}
      />
      <Typography align="center" color="text.secondary">
        {ratingState}
      </Typography>
      <DownvoteButton
        size="small"
        sx={{ mx: -2.75 }}
        active={voteState === -1}
        onClick={downvoteHandler}
      />
    </>
  );
};
