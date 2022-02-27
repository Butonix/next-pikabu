import { Layout } from "@components/Layout";
import { SectionHeader } from "@components/SectionHeader";
import { Avatar, Button, Typography } from "@mui/material";
import { getUserByName } from "@rest/user";
import { User } from "@shared/types";
import { formatDuration, intervalToDuration } from "date-fns";

import { ru } from "date-fns/locale";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

interface UserPageProps {
  user: User;
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  const createdAt = "2021-01-24T17:36:22.898+00:00";
  return (
    <Layout>
      <SectionHeader
        bgimage="https://picsum.photos/200/200"
        avatar={<Avatar sx={{ width: 128, height: 128 }}>A</Avatar>}
        actions={
          <>
            <Button variant="contained">click</Button>
          </>
        }
      >
        <Typography>
          {formatDuration(
            intervalToDuration({
              start: new Date(createdAt),
              end: new Date(),
            }),
            { locale: ru, format: ["years", "months", "weeks", "days"] }
          )}
        </Typography>
      </SectionHeader>
    </Layout>
  );
};

export default UserPage;

interface UserPageParams extends ParsedUrlQuery {
  username: string;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { username } = context.params as UserPageParams;
//   const user = await getUserByName(username);

//   return {
//     props: {
//       user: user,
//     },
//   };
// };
