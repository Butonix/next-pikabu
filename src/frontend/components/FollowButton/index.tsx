import { LoadingButton } from "@mui/lab";
import { followCommunity, followUser } from "@rest/follow";
import { FollowPayload } from "@shared/types";
import { reloadClientSession } from "@shared/utils/reloadClientSession";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface UserFollowButtonProps {
  userId: string;
  onUnauthAction: () => void;
}

interface CommunityFollowButtonProps {
  communityId: string;
  onUnauthAction: () => void;
}

export const UserFollowButton: React.FC<UserFollowButtonProps> = ({
  userId,
  onUnauthAction,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const { data } = useSession();

  const handleSubscribe = async (payload: FollowPayload) => {
    if (!data?.user) {
      onUnauthAction();
      return;
    }
    setStatus("loading");
    try {
      await followUser(userId, payload);
      setStatus("done");
    } catch (e) {
      setStatus("error");
    }
  };
  if (data?.user.followed_people_ids?.includes(userId)) {
    return (
      <LoadingButton
        loading={status === "loading"}
        color="secondary"
        variant="contained"
        onClick={() => handleSubscribe({ value: -1 })}
      >
        Отписаться
      </LoadingButton>
    );
  }
  return (
    <LoadingButton
      loading={status === "loading"}
      variant="contained"
      onClick={() => handleSubscribe({ value: 1 })}
    >
      Подписаться
    </LoadingButton>
  );
};

export const CommunityFollowButton: React.FC<CommunityFollowButtonProps> = ({
  communityId,
  onUnauthAction,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const { data } = useSession();
  const handleSubscribe = async (payload: FollowPayload) => {
    if (!data?.user) {
      onUnauthAction();
      return;
    }
    setStatus("loading");
    try {
      await followCommunity(communityId, payload);
      setStatus("done");
      reloadClientSession();
    } catch (e) {
      setStatus("error");
    }
  };
  if (data?.user.followed_community_ids?.includes(communityId)) {
    return (
      <LoadingButton
        loading={status === "loading"}
        variant="contained"
        color="secondary"
        onClick={() => handleSubscribe({ value: -1 })}
      >
        Отписаться
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      loading={status === "loading"}
      variant="contained"
      onClick={() => handleSubscribe({ value: 1 })}
    >
      Подписаться
    </LoadingButton>
  );
};
