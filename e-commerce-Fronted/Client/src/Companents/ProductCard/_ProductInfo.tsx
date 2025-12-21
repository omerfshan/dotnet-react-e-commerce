import { CardContent, Typography, Box, Rating } from "@mui/material";
import colors from "../../theme/color";


type Props = {
  name: string;
  price: number;
};

export default function ProductInfo({ name, price }: Props) {
  return (
    <CardContent sx={{ pt: 1.2 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          lineHeight: 1.3,
          height: 38,
          overflow: "hidden",
          color: "#111",
        }}
      >
        {name}
      </Typography>

      {/* RATING */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
        <Rating
          value={4.2}
          precision={0.1}
          size="small"
          readOnly
          sx={{ color: colors.primaryHover }}
        />
        <Typography variant="caption" color="text.secondary">
          (61061)
        </Typography>
      </Box>

      {/* PRICE */}
      <Typography
        sx={{
          mt: 1,
          fontWeight: 900,
          fontSize: 18,
          color: colors.primary,
        }}
      >
        {price.toLocaleString("tr-TR")} TL
      </Typography>
    </CardContent>
  );
}
