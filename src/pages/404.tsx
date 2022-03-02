import Image from "next/image";
import { Box } from "@mui/system";
import { Layout } from "@components/Layout";
import { Typography } from "@mui/material";
import Link from "next/link";
export default function Custom404() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image alt="404 page" src="/404.svg" width={500} height={300} />
        <Typography variant="h4" component="h1">
          Страница не найдена
        </Typography>
        <Link href="/" passHref>
          <Typography sx={{ color: "primary.main", cursor: "pointer" }}>
            Вернуться на главную
          </Typography>
        </Link>
      </Box>
    </Layout>
  );
}
