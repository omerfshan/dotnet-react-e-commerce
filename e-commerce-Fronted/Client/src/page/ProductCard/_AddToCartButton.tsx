import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { addToCart } from "../../store/Cart/cartSlice";
           // ✅

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading);

  return (
    <Box px={1.5} pb={1.5} pt={0}>
      <LoadingButton
        startIcon={<ShoppingCart />}
        variant="outlined"
        fullWidth
        size="small"
        loading={loading}
        loadingPosition="start"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addToCart(productId));
        }}
      >
        Sepete Ekle
      </LoadingButton>
    </Box>
  );
}