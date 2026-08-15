import { IconButton, Chip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import colors from "../../theme/color";
import type { IProduct } from "../../Model/IProduct";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { toggleFavoriteAsync } from "../../store/Slices/favoriteSlice";

type Props = {
  product: IProduct;
};

export default function ProductActions({ product }: Props) {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorite.items);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavoriteAsync(product));
  };

  return (
    <>
      {/* FAVORI */}
      <IconButton   
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: isFavorite ? "rgba(239, 68, 68, 0.1)" : colors.softBg,
          zIndex: 2,
          color: isFavorite ? "#EF4444" : colors.primary,
          "&:hover": {
            bgcolor: isFavorite ? "#EF4444" : colors.primary,
            color: "#fff",
          },
        }}
      >
        {isFavorite ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>

      {/* BADGE */}
      <Chip
        label="En Çok Satan"
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: colors.newBadge,
          color: "#fff",
          fontWeight: 800,
          zIndex: 2,
        }}
      />
    </>
  );
}
