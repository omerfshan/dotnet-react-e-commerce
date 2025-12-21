import { Box, Button } from "@mui/material";

export default function TopLinks() {
  const topLinks = ["Kampanyalar", "Satıcı Ol", "Hakkımızda", "Destek"];

  return (
    <Box
      sx={{
        borderBottom: "1px solid #E5E7EB",
        display: { xs: "none", md: "flex" },
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          height: 30,
          whiteSpace: "nowrap",
        }}
      >
        {topLinks.map((t) => (
          <Button
            key={t}
            sx={{
              fontSize: 12,
              color: "#6B7280",
              textTransform: "none",
              minWidth: "auto",
              py: 0,
              lineHeight: 1,
            }}
          >
            {t}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
