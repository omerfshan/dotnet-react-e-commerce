import { Button, Box } from "@mui/material";
import requests from "../../Api/Api";
import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../Context/CartContext";


type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);
  const { refreshCart } = useCart();   // 🔥 BURADA ALIYORUZ

  function handleAddItem(productId: number) {
    setLoading(true);

    requests.Cart.addItem(productId)
      .then(() => {
        console.log("Sepete eklendi");
        refreshCart();  // 🔥🔥 ASIL KRİTİK ÇAĞRI BU
      })
      .catch(err => console.log("Hata:", err))
      .finally(() => setLoading(false));
  }

  return (
    <Box px={1.5} pb={1.5} pt={0}>
      <Button
        startIcon={<ShoppingCart />}
        variant="outlined"
        fullWidth
        size="small"
        disabled={loading}
        onClick={(e) => {
          e.stopPropagation();
          handleAddItem(productId);
        }}
      >
        Sepete Ekle
      </Button>
    </Box>
  );
}
