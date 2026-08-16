import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { clearFavoritesAsync } from "../../store/Slices/favoriteSlice";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/color";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteItems = useAppSelector((state) => state.favorite.items);

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "85vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Page Title Row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FavoriteIcon sx={{ color: "#EF4444", fontSize: 32 }} />
            <Typography variant="h4" fontWeight={800}>
              Favorilerim
            </Typography>
            <Chip
              label={`${favoriteItems.length} Ürün`}
              sx={{
                bgcolor: colors.primary,
                color: "white",
                fontWeight: 700,
                fontSize: 14,
              }}
            />
          </Box>

          {favoriteItems.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => dispatch(clearFavoritesAsync())}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                px: 2.5,
              }}
            >
              Favorileri Temizle
            </Button>
          )}
        </Stack>

        {/* Empty State */}
        {favoriteItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 4,
              border: "1px dashed #CBD5E1",
              bgcolor: "white",
            }}
          >
            <FavoriteIcon sx={{ fontSize: 72, color: "#CBD5E1", mb: 2 }} />
            <Typography variant="h5" fontWeight={700} color="#334155" mb={1}>
              Henüz Favori Ürününüz Yok
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Beğendiğiniz ürünlerin üzerindeki kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingBagIcon />}
              onClick={() => navigate("/catalog")}
              sx={{
                bgcolor: colors.primary,
                color: "white",
                borderRadius: 999,
                px: 4,
                py: 1.2,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "none",
                "&:hover": { bgcolor: colors.primaryHover },
              }}
            >
              Alışverişe Başla
            </Button>
          </Paper>
        ) : (
          /* Products Grid */
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {favoriteItems.map((product) => (
              <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
