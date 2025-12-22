import { AppBar, Divider } from "@mui/material";
import { useEffect, useState } from "react";

import TopLinks from "./_TopLinks";
import MainBar from "./_MainBar";
import CategoryBar from "./_CategoryBar";
import ExploreMenu from "./_ExploreMenu";
import colors from "../../theme/color";
import type { ICatagory } from "../../Model/ICatagory";


type Props = { favoriteCount: number };

export default function Header({ favoriteCount }: Props) {
  const [openExplore, setOpenExplore] = useState(false);

  // ✅ backend'ten gelen kategoriler
  const [categories, setCategories] = useState<ICatagory[]>([]);

  const primary = colors.primary;
  const primaryHover = colors.primaryHover;
  const softBg = colors.softBg;
  const newBadge = colors.newBadge;

  useEffect(() => {
    fetch("http://localhost:5232/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Categories fetch failed: " + res.status);
        return res.json();
      })
      .then((data) => {
        // backend: { id, name }  -> frontend: { label }
        const mapped: ICatagory[] = data.map((c: any) => ({
          label: c.name,
          isNew:c.isNew,
          id:c.id
        }));


        setCategories(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar position="relative" elevation={0} sx={{ bgcolor: "#fff", color: "#111" }}>
      <TopLinks />

      <MainBar primary={primary} softBg={softBg} favoriteCount={favoriteCount} />

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
