import { AppBar, Divider } from "@mui/material";
import { useState } from "react";

import TopLinks from "./_TopLinks";
import MainBar from "./_MainBar";
import CategoryBar from "./_CategoryBar";
import ExploreMenu from "./_ExploreMenu";
import type { NavItem } from "./types";
import colors from "../../theme/color";
type Props = { favoriteCount: number };

export default function Header({ favoriteCount }: Props) {

  const [openExplore, setOpenExplore] = useState(false);

  const categories: NavItem[] = [
    { label: "Moda" },
    { label: "Teknoloji" },
    { label: "Ev & Yaşam" },
    { label: "Bakım & Sağlık" },
    { label: "Spor" },
    { label: "Market" },
    { label: "Popüler", isNew: true },
    { label: "Günün Fırsatı", isNew: true },
  ];

  const primary = colors.primary;
  const primaryHover = colors.primaryHover;
  const softBg = colors.softBg;
  const newBadge = colors.newBadge;

  return (
    <AppBar position="relative" elevation={0} sx={{ bgcolor: "#fff", color: "#111" }}>
      <TopLinks />
    <MainBar
  primary={primary}
  softBg={softBg}
  favoriteCount={favoriteCount}
/>

      <Divider />
      <CategoryBar
        categories={categories}
        openExplore={openExplore}
        setOpenExplore={setOpenExplore}
        primary={primary}
        primaryHover={primaryHover}
        newBadge={newBadge}
      />
      <ExploreMenu
        open={openExplore}
        onClose={() => setOpenExplore(false)}
        categories={categories}
        newBadge={newBadge}
      />
      <Divider />
    </AppBar>
  );
}
