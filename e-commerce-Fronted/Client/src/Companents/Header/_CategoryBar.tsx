import {
  Box,
  Toolbar,
  Button,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { NavItem } from "./types";

type Props = {
  categories: NavItem[];
  openExplore: boolean;
  setOpenExplore: (v: boolean) => void;
  primary: string;
  primaryHover: string;
  newBadge: string;
};

export default function CategoryBar({
  categories,
  openExplore,
  setOpenExplore,
  primary,
  primaryHover,
  newBadge,
}: Props) {
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Toolbar sx={{ minHeight: 48, justifyContent: "center" }}>
        {/* KEŞFET XS */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Button
            startIcon={<MenuIcon />}
            onClick={() => setOpenExplore(!openExplore)}
            sx={{ fontWeight: 900, color: primary }}
          >
            KEŞFET
          </Button>
          <Chip label="Yeni" size="small" sx={{ bgcolor: newBadge, color: "#fff" }} />
        </Box>

        {/* KATEGORİLER MD+ */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {categories.map((c) => (
            <Box
              key={c.label}
              sx={{
                fontWeight: 800,
                cursor: "pointer",
                borderBottom: "2px solid transparent",
                "&:hover": {
                  color: primaryHover,
                  borderBottomColor: primaryHover,
                },
              }}
            >
              {c.label}
              {c.isNew && (
                <Chip
                  label="Yeni"
                  size="small"
                  sx={{ ml: 0.5, bgcolor: newBadge, color: "#fff" }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </Box>
  );
}
