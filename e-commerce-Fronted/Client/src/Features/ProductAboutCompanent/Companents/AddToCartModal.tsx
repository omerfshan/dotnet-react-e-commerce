import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Button,
  Divider,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../../theme/color";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    imageUrl: string;
  };
};

export default function AddToCartModal({ open, onClose, product }: Props) {
const [btnLoading, setBtnLoading] = useState<"cart" | "continue" | null>(null);
const handleGoCart = () => {
  setBtnLoading("cart");

  setTimeout(() => {
    window.location.href = "/cart";
  }, 500);
};

const handleContinue = () => {
  setBtnLoading("continue");

  setTimeout(() => {
    onClose();
    setBtnLoading(null);
  }, 300);
};
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          minWidth: 420,
          borderRadius: 3,
          p: 3,
          position: "relative",
        }}
      >
        {/* ❌ Close */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* 🟢 Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: colors.newBadge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
            }}
          >
            ✓
          </Box>

          <Typography sx={{ fontWeight: 900, color: colors.newBadge }}>
            Ürün sepetinizde
          </Typography>
        </Stack>

        {/* 🧱 Product */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Box
            component="img"
            src={product.imageUrl}
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          />

          <Typography sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* 🔥 Actions */}
        <Stack spacing={1.5}>
         <Button
                fullWidth
                variant="contained"
                onClick={handleGoCart}
                disabled={btnLoading !== null}
                sx={{
                bgcolor: colors.primary,
                "&:hover": { bgcolor: colors.primaryHover },
                borderRadius: 999,
                fontWeight: 900,
                py: 1.2,
                textTransform: "none",
                }}
                >
                {btnLoading === "cart" ? (
                <CircularProgress size={20} color="inherit" />
                ) : (
                "Sepete git"
                )}
                </Button>

          <Button
                fullWidth
                variant="outlined"
                onClick={handleContinue}
                disabled={btnLoading !== null}
                sx={{
                borderRadius: 999,
                fontWeight: 900,
                py: 1.2,
                textTransform: "none",
                borderColor: colors.primary,
                color: colors.primary,
                }}
                >
                {btnLoading === "continue" ? (
                <CircularProgress size={20} color="inherit" />
                ) : (
                "Alışverişe devam et"
                )}
                </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}