import { IconButton, Chip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import colors from "../../theme/color";

// type Props = {
  
// };

export default function ProductActions() {

  return (
    <>
      {/* FAVORI */}
      <IconButton   
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: colors.softBg,
          zIndex: 2,
          color: colors.primary,
          "&:hover": {
            bgcolor: colors.primary,
            color: "#fff",
          },
        }}
      >
        <FavoriteBorderIcon fontSize="small" />
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
