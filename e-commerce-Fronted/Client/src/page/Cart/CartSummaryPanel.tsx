// src/pages/cart/CartSummaryPanel.tsx
import { Box, Paper, Typography, Button } from "@mui/material";
import colors from "../../theme/color";
import { useCart } from "../../Context/CartContext";


export default function CartSummaryPanel() {
  const { totalPrice, cart } = useCart(); // 🔥 props yok

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, mb: 1, opacity: 0.7 }}
        >
          SEÇİLEN ÜRÜNLER ({cart?.cartItems.length})
        </Typography>

        <Typography fontWeight={900} fontSize={26}>
          {totalPrice.toLocaleString("tr-TR")} TL
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: colors.primary,
            "&:hover": { bgcolor: colors.primaryHover },
            fontWeight: 800,
            textTransform: "none",
          }}
        >
          Alışverişi tamamla
        </Button>
      </Paper>
    </Box>
  );
}
