// src/pages/cart/EmptyCartState.tsx

import { Box, Typography} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import colors from "../../theme/color";

export default function EmptyCartState() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        bgcolor: colors.softBg,
        px: 2,
      }}
    >
      <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: colors.primary }} />
      <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
        Sepetin şu an boş
      </Typography>
      <Typography
        sx={{ mt: 1, maxWidth: 480, textAlign: "center", opacity: 0.7 }}
      >
        Sepetini fırsatlarla doldurmak için ürünleri incelemeye başlayabilirsin.
      </Typography>

      {/* İstersen buton ekleyebilirsin */}
      {/* <Button sx={{ mt: 3 }} variant="contained" href="/">
        Alışverişe başla
      </Button> */}
    </Box>
  );
}
