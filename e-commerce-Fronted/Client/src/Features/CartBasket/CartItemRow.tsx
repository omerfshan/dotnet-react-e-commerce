import { Box, Typography, Stack, IconButton, Grid, CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import colors from "../../theme/color";
import type { ICartItem } from "../../Model/ICartItem";

import { increaseCartItem, decreaseCartItem, removeCartItem } from "../../store/Slices/cartSlice"; // ✅ değişti
import { useState } from "react";
import { useAppDispatch } from "../../store/ hooks";
import { imageUrl } from "../../Api/config";

type CartItemRowProps = {
  item: ICartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch(); // ✅ değişti
  const [loadingType, setLoadingType] = useState<"inc" | "dec" | "del" | null>(null);

  const handleIncrease = async () => {
    setLoadingType("inc");
    await dispatch(increaseCartItem(item.productId)); // ✅ değişti
    setLoadingType(null);
  };

  const handleDecrease = async () => {
    setLoadingType("dec");
    await dispatch(decreaseCartItem(item.productId)); // ✅ değişti
    setLoadingType(null);
  };

  const handleRemove = async () => {
    setLoadingType("del");
    await dispatch(removeCartItem({ productId: item.productId, quantity: item.quantity })); // ✅ değişti
    setLoadingType(null);
  };

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid " + colors.softBg }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 2 }}>
          <Box
            component="img"
            src={imageUrl(item.imageUrl)}
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "contain",
              bgcolor: colors.softBg,
              p: 1,
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid size={{ xs: 9, sm: 5 }}>
          <Typography fontWeight={700} sx={{ color: "#000" }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.7 }}>
            Tahmini teslimat:{" "}
            <Typography component="span" fontWeight={700}>13 Ocak Salı</Typography>{" "}
            günü kargoda
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8, display: "flex", alignItems: "center" }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <span style={{ color: colors.newBadge, fontWeight: 600 }}>Kargo bedava</span>
          </Typography>
        </Grid>

        <Grid size={{ xs: 6, sm: 2 }} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}>
          <Stack spacing={1} alignItems="center" direction="row">
            <Box
              sx={{
                borderRadius: 999,
                border: "1px solid " + colors.softBg,
                px: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <IconButton size="small" onClick={handleDecrease} disabled={loadingType !== null}>
                {loadingType === "dec" ? <CircularProgress size={16} /> : <RemoveIcon fontSize="small" />}
              </IconButton>
              <Typography width={20} textAlign="center">{item.quantity}</Typography>
              <IconButton size="small" onClick={handleIncrease} disabled={loadingType !== null}>
                {loadingType === "inc" ? <CircularProgress size={16} /> : <AddIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ justifyContent: "flex-end" }}>
            <Typography fontWeight={700} fontSize={18} sx={{ color: "#000", whiteSpace: "nowrap" }}>
              {(item.price * item.quantity).toLocaleString("tr-TR")} TL
            </Typography>
            <IconButton color="error" size="small" onClick={handleRemove} disabled={loadingType !== null}>
              {loadingType === "del" ? <CircularProgress size={16} color="error" /> : <DeleteOutlineIcon fontSize="small" />}
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}