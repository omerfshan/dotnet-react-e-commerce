import { Box, Container, Typography } from "@mui/material";


export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#1a1a1a", // Dark background for footer
        color: "#fff",
        py: 3,
        mt: "auto", // Push to bottom if flex container used, though App structure might need adjustment for sticky footer
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" fontWeight={700} sx={{ opacity: 0.9 }}>
          Bu bir test sitesidir
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.5, display: "block", mt: 1 }}>
          © {new Date().getFullYear()} Nova E-Ticaret. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
}
