import { Box, CircularProgress, Typography } from "@mui/material";
import colors from "../../theme/color";
import EmptyCartState from "./EmptyCartState";
import CartSummaryPanel from "./CartSummaryPanel";
import CartItemRow from "./CartItemRow";
import { useAppSelector } from "../../store/ hooks";

export default function CartPage() {
  const cart = useAppSelector((state) => state.cart.cart);
  const status = useAppSelector((state) => state.cart.status);

  if (status === "loading" && !cart) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <Box sx={{ bgcolor: colors.softBg, py: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h5" fontWeight={700} sx={{ px: 3, py: 2, color: "#000" }}>
          Sepetim ({cart.cartItems.length} ürün)
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2.5fr 1fr" },
            gap: 2,
            alignItems: "flex-start",
            px: { xs: 0, md: 3 },
          }}
        >
          <Box>
            <Box sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2, overflow: "hidden" }}>
              <Box
                sx={{
                  p: 2,
                  borderBottom: "1px solid " + colors.softBg,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ color: "#000" }}>
                  Satıcı:{" "}
                  <Typography component="span" fontWeight={700}>Nova Store</Typography>
                </Typography>
                <Typography sx={{ color: colors.newBadge, fontWeight: 700 }}>Kargo bedava</Typography>
              </Box>
              {cart.cartItems.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </Box>
          </Box>
          <CartSummaryPanel />
        </Box>
      </Box>
    </Box>
  );
}