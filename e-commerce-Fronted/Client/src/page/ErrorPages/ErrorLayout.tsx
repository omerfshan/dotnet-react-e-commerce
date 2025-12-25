import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  code: number;
  title: string;
  description?: string;
};

export default function ErrorLayout({ code, title, description }: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: "6vh", // 👈 yukarı-orta burası
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 720,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.7 }}>
            HATA KODU
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 900, mt: 0.5 }}>
            {code}
          </Typography>

          <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
            {title}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button variant="contained" onClick={() => navigate("/")}>
              ANA SAYFAYA DÖN
            </Button>

            <Button variant="outlined" onClick={() => navigate(-1)}>
              GERİ DÖN
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
