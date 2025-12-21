import { Box, CardMedia } from "@mui/material";
import colors from "../../theme/color";


type Props = {
  imageUrl: string;
  name: string;
};

export default function ProductImage({ imageUrl, name }: Props) {
  return (
    <Box sx={{ bgcolor: colors.softBg }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:5232/images/${imageUrl}`}
        alt={name}
        sx={{ objectFit: "contain", p: 2 }}
      />
    </Box>
  );
}
