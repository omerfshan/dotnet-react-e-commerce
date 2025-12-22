import {
  Box,
  Grid,
  Stack,
  IconButton,
  Chip
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import colors from "../../../theme/color";

type Props = {
  images: string[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  stock: number;
};

export default function Gallery({
  images,
  activeIndex,
  setActiveIndex,
  stock,
}: Props) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 2.4 }}>
        <Stack spacing={1}>
          {images.map((src, i) => (
            <Box
              key={src}
              onClick={() => setActiveIndex(i)}
              sx={{
                aspectRatio: "1/1",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                border:
                  i === activeIndex
                    ? `2px solid ${colors.primary}`
                    : "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <Box component="img" src={src} sx={{ width: "100%", height: "100%" }} />
            </Box>
          ))}
        </Stack>
      </Grid>

      <Grid size={{ xs: 9.6 }}>
        <Box sx={{ position: "relative", aspectRatio: "16/11" }}>
          <Box
            component="img"
            src={images[activeIndex]}
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

          <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 12, right: 12 }}>
            <IconButton><OpenInFullIcon /></IconButton>
            <IconButton><ShareOutlinedIcon /></IconButton>
            <IconButton><FavoriteBorderIcon /></IconButton>
          </Stack>

          <Chip
            label={stock > 0 ? "STOKTA" : "TÜKENDİ"}
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: stock > 0 ? colors.primary : "gray",
              color: "#fff",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
