import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TopLinks() {
  const topLinks = [
    { label: "Hakkımızda", path: "/about" },
    { label: "İletişim", path: "/contact" },
  ];

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
            key={t.path}
            component={NavLink}
            to={t.path}
            sx={{
              fontSize: 12,
              color: "#6B7280",
              textTransform: "none",
              minWidth: "auto",
              py: 0,
              lineHeight: 1,

              "&.active": {
                color: "#111827",
                fontWeight: 700,
              },
            }}
          >
            {t.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
