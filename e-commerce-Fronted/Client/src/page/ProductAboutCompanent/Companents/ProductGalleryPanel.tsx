import { Box, Grid, Paper, Stack, IconButton, Chip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import colors from "../../../theme/color";

type Props = {
  images: string[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  stock: number;
};

export default function ProductGalleryPanel({
  images,
  activeIndex,
  setActiveIndex,
  stock,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: { xs: 1.5, md: 2 },
        border: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "#fff",
      }}
    >
      <Grid container spacing={2}>
        {/* thumbnails */}
        <Grid size={{ xs: 2.4, sm: 2, md: 2 }}>
          <Stack spacing={1}>
            {images.map((src, i) => {
              const selected = i === activeIndex;
              return (
                <Box
                  key={src}
                  onClick={() => setActiveIndex(i)}
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: selected
                      ? `2px solid ${colors.primary}`
                      : "1px solid rgba(0,0,0,0.12)",
                    boxShadow: selected ? "0 8px 18px rgba(0,0,0,0.10)" : "none",
                    transition: "0.15s",
                    "&:hover": { transform: "translateY(-1px)" },
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`thumb-${i}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Grid>

        {/* main image */}
        <Grid size={{ xs: 9.6, sm: 10, md: 10 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              bgcolor: "#fff",
              aspectRatio: { xs: "4 / 3", md: "16 / 11" },
            }}
          >
            <Box
              component="img"
              src={images[activeIndex]}
              alt="main"
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            {/* top-right actions */}
            <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 12, right: 12 }}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid rgba(0,0,0,0.10)",
                  "&:hover": { bgcolor: "#fff" },
                }}
                onClick={() => console.log("zoom")}
              >
                <OpenInFullIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid rgba(0,0,0,0.10)",
                  "&:hover": { bgcolor: "#fff" },
                }}
                onClick={() => console.log("share")}
              >
                <ShareOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid rgba(0,0,0,0.10)",
                  "&:hover": { bgcolor: "#fff" },
                }}
                onClick={() => console.log("favorite")}
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            </Stack>

            {/* badge */}
            <Chip
              label={stock > 0 ? "STOKTA" : "TÜKENDİ"}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                fontWeight: 800,
                bgcolor: stock > 0 ? colors.primary : "rgba(0,0,0,0.45)",
                color: "#fff",
              }}
            />
          </Box>

          {/* hint row */}
          <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
            <Chip
              icon={<LocalShippingOutlinedIcon />}
              label="Hızlı Kargo"
              size="small"
              sx={{ bgcolor: "rgba(91,46,255,0.08)", color: colors.primary }}
            />
            <Chip
              icon={<VerifiedOutlinedIcon />}
              label="Güvenli Ödeme"
              size="small"
              sx={{ bgcolor: "rgba(16,185,129,0.10)", color: "#0f766e" }}
            />
            <Chip
              icon={<ReplayOutlinedIcon />}
              label="Kolay iade (policy)"
              size="small"
              sx={{ bgcolor: "rgba(0,0,0,0.05)" }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
