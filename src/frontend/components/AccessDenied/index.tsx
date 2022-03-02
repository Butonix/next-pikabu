import React from "react";

import Image from "next/image";
import { Box } from "@mui/system";
import { Layout } from "@components/Layout";

export const AccessDenied = () => {
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
};
