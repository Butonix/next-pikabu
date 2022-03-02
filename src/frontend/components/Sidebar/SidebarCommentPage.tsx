import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface SidebarCommentPageProps {
  summary: string;
  rules?: string;
  author: string;
  author_id: string;
}

export const SidebarCommentPage: React.FC<SidebarCommentPageProps> = ({
  author,
  rules,
  summary,
  author_id,
}) => {
  return (
    <Paper variant="outlined">
      <Box sx={{ bgcolor: "background.default", px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ fontSize: 14 }}>
          О сообществе
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ fontSize: 12 }}>{summary}</Typography>
      </Box>
      <Divider />
      <Accordion disableGutters square sx={{ boxShadow: 0 }}>
        <AccordionSummary
          sx={{ bgcolor: "background.default", m: 0, px: 3 }}
          expandIcon={<ExpandMore />}
          aria-controls="community-rules-content"
          id="community-rules-header"
        >
          <Typography color="error.dark" sx={{ fontSize: 14 }}>
            Правила сообщества
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "background.paper", px: 3, py: 2 }}>
          <Typography sx={{ fontSize: 12 }}>{rules}</Typography>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Box sx={{ px: 3, py: 2, fontSize: 12 }}>
        <Stack spacing={1}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: 14 }}>
              Управление сообществом
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Link href={`/users/${author}`}>
              <Typography
                sx={{
                  fontSize: "inherit",
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
              >
                {author}
              </Typography>
            </Link>
            <Typography
              sx={{ fontSize: "inherit", ml: 2, color: "text.secondary" }}
            >
              Администратор
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};
