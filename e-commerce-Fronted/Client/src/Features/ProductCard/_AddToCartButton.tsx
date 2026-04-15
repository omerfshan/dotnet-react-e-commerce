import { Box, Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../store/ hooks";
import { addToCart } from "../../store/Slices/cartSlice";

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false); // local state

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    await dispatch(addToCart(productId));
    setLoading(false);
  };

  return (
    <Box px={1.5} pb={1.5} pt={0}>
      <Button
        startIcon={<ShoppingCart />}
        variant="outlined"
        fullWidth
        size="small"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? "Ekleniyor..." : "Sepete Ekle"}
      </Button>
    </Box>
  );
}