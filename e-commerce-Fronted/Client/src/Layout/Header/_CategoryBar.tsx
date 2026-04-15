import {
  Box,
  Toolbar,
  Button,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { ICatagory } from "../../Model/ICatagory";
import { NavLink } from "react-router-dom";


type Props = {
  categories: ICatagory[];
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
          {/* <Chip label="Yeni" size="small" sx={{ bgcolor: newBadge, color: "#fff" }} /> */}
        </Box>

        {/* KATEGORİLER MD+ */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
        {categories.map((c) => (
  <NavLink
    key={c.id}
    to={`/category/${c.id}`}
    style={() => ({
      textDecoration: "none",
      color: "inherit",
    })}
  >
    {({ isActive }) => (
      <Box
        sx={{
          fontWeight: 800,
          cursor: "pointer",
          borderBottom: "2px solid",
          borderBottomColor: isActive ? primary : "transparent",
          color: isActive ? primary : "inherit",
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
    )}
  </NavLink>
))}


        
        </Box>
      </Toolbar>
    </Box>
  );
}
