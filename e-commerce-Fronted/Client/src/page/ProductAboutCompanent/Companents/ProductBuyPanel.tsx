import {
  Box,
  Paper,
  Typography,
  Divider,
  Stack,

  Button,
  Rating,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Link,
  Avatar,
  Chip,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


import colors from "../../../theme/color";
import type { IProduct } from "../../../Model/IProduct";

function formatMoneyTRY(value: number) {
  return `₺${Number(value).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

type Seller = {
  name: string;
  feedbackPercent: number;
  feedbackCount: number;
};

type Props = {
  product: IProduct;
  seller: Seller;
  highlights: string[];
  discountText: string | null;

  optionValues: Record<string, string>;
  setOptionValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProductBuyPanel({
  product,
  seller,
  highlights,
  discountText,
  optionValues,
  setOptionValues,
  qty,
  setQty,
}: Props) {
  return (
    <Box sx={{ position: "sticky", top: 16 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          p: { xs: 2, md: 2.5 },
          border: "1px solid rgba(0,0,0,0.08)",
          bgcolor: "#fff",
        }}
      >
        {/* Title */}
        <Typography sx={{ fontWeight: 900, fontSize: { xs: 18, md: 22 } }}>
          {product.name}
        </Typography>

        {/* küçük bilgi satırı: stock */}
        <Typography sx={{ mt: 0.5, color: "rgba(0,0,0,0.60)", fontSize: 13 }}>
          {product.stock > 0 ? `Stok: ${product.stock}` : "Stokta yok"}
        </Typography>

        {/* rating + meta (placeholder) */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Rating value={4.6} precision={0.1} readOnly size="small" />
          <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.65)" }}>
            4.6 · 2,138 ratings
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Seller row (placeholder) */}
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar sx={{ width: 34, height: 34, bgcolor: "rgba(0,0,0,0.08)" }}>
            {seller.name[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 13 }}>
              {seller.name}{" "}
              <Typography
                component="span"
                sx={{ fontWeight: 700, color: "rgba(0,0,0,0.55)" }}
              >
                ({seller.feedbackCount})
              </Typography>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.60)" }}>
              {seller.feedbackPercent}% positive ·{" "}
              <Link underline="hover" sx={{ cursor: "pointer" }}>
                Seller&apos;s items
              </Link>{" "}
              ·{" "}
              <Link underline="hover" sx={{ cursor: "pointer" }}>
                Contact
              </Link>
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Price */}
        <Stack spacing={0.5}>
          <Typography sx={{ fontWeight: 900, fontSize: 28, letterSpacing: -0.5 }}>
            {formatMoneyTRY(Number(product.price))}
          </Typography>

          {/* listPrice yok, discountText yok; layout bozulmasın diye bırakıyorum */}
          {discountText && (
            <Chip
              label={discountText}
              size="small"
              sx={{
                bgcolor: "rgba(16,185,129,0.12)",
                color: colors.newBadge,
                fontWeight: 800,
                width: "fit-content",
              }}
            />
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Condition (placeholder) */}
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>Durum:</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 900 }}>Yeni</Typography>
        </Stack>

        {/* Options (modelinde yok; layout bozulmasın diye kapalı) */}
        {Object.keys(optionValues).length ? (
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {Object.entries(optionValues).map(([label, value]) => (
              <FormControl key={label} fullWidth size="small">
                <InputLabel>{label}</InputLabel>
                <Select
                  label={label}
                  value={value}
                  onChange={(e) =>
                    setOptionValues((p) => ({ ...p, [label]: String(e.target.value) }))
                  }
                >
                  <MenuItem value={value}>{value}</MenuItem>
                </Select>
              </FormControl>
            ))}
          </Stack>
        ) : null}

        {/* Quantity */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
          <Typography
            sx={{
              width: 90,
              fontSize: 13,
              color: "rgba(0,0,0,0.65)",
              fontWeight: 800,
            }}
          >
            Adet
          </Typography>
          <TextField
            size="small"
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            inputProps={{ min: 1, max: Math.max(1, product.stock) }}
            sx={{ width: 110 }}
          />
          <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
            {product.stock > 0 ? `${product.stock} stok` : "stok yok"}
          </Typography>
        </Stack>

        {/* Coupon (placeholder) */}
        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 1.4,
            borderRadius: 2.5,
            bgcolor: "rgba(91,46,255,0.06)",
            borderColor: "rgba(91,46,255,0.18)",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                Sepette{" "}
                <Box component="span" sx={{ color: colors.primary }}>
                  ek indirim
                </Box>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.60)" }}>
                Kampanya detayları mağazaya göre değişir
              </Typography>
            </Box>
            <Link underline="hover" sx={{ fontSize: 13, fontWeight: 800, cursor: "pointer" }}>
              Detay
            </Link>
          </Stack>
        </Paper>

        {/* CTA Buttons */}
        <Stack spacing={1.2} sx={{ mt: 2.2 }}>
          <Button
            fullWidth
            variant="contained"
            disabled={product.stock <= 0}
            sx={{
              py: 1.2,
              borderRadius: 999,
              fontWeight: 900,
              bgcolor: colors.primary,
              "&:hover": { bgcolor: colors.primaryHover },
              textTransform: "none",
            }}
            onClick={() => console.log("buy now", product.id, qty)}
          >
            Hemen Al
          </Button>

          <Button
            fullWidth
            variant="outlined"
            disabled={product.stock <= 0}
            sx={{
              py: 1.15,
              borderRadius: 999,
              fontWeight: 900,
              borderColor: "rgba(91,46,255,0.35)",
              color: colors.primary,
              textTransform: "none",
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: "rgba(91,46,255,0.06)",
              },
            }}
            onClick={() => console.log("add to cart", product.id, qty)}
          >
            Sepete Ekle
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{
              py: 1.1,
              borderRadius: 999,
              fontWeight: 900,
              color: "rgba(0,0,0,0.75)",
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            }}
            startIcon={<FavoriteBorderIcon />}
            onClick={() => console.log("watch", product.id)}
          >
            Favoriye Ekle
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Highlights */}
        <Typography sx={{ fontWeight: 900, fontSize: 14, mb: 1 }}>Öne Çıkanlar</Typography>
        <Stack spacing={0.7}>
          {highlights.map((h) => (
            <Typography key={h} sx={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
              • {h}
            </Typography>
          ))}
        </Stack>
      </Paper>

      {/* below card: extra sections */}
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 3,
          p: 2,
          border: "1px solid rgba(0,0,0,0.08)",
          bgcolor: "#fff",
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: 14 }}>Kargo & İade</Typography>
        <Typography sx={{ mt: 0.8, fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
          Kargo/İade politikası satıcıya göre değişebilir. (Burayı API’den doldurursun)
        </Typography>
      </Paper>
    </Box>
  );
}
