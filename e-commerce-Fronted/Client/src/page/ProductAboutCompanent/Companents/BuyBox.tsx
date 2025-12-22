import {
  Paper,
  Typography,
  Button,
  Divider,
  Stack,
  TextField,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatMoneyTRY } from "../utils/formatMoney";
import type { IProduct } from "../../../Model/IProduct";
import colors from "../../../theme/color";

type Props = {
  product: IProduct;
  qty: number;
  setQty: (n: number) => void;
};

export default function BuyBox({ product, qty, setQty }: Props) {
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography fontWeight={900}>{product.name}</Typography>

      <Rating value={4.6} readOnly size="small" />

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={900} fontSize={28}>
        {formatMoneyTRY(product.price)}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <Typography>Adet</Typography>
        <TextField
          type="number"
          size="small"
          value={qty}
          onChange={(e) => setQty(Math.max(1, +e.target.value))}
          sx={{ width: 100 }}
        />
      </Stack>

      <Stack spacing={1.2} mt={2}>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: colors.primary }}
        >
          Hemen Al
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ color: colors.primary }}
        >
          Sepete Ekle
        </Button>

        <Button
          fullWidth
          startIcon={<FavoriteBorderIcon />}
        >
          Favoriye Ekle
        </Button>
      </Stack>
    </Paper>
  );
}
