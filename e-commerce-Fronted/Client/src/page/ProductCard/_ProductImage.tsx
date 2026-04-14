import { Box, CardMedia } from "@mui/material";
import colors from "../../theme/color";
import { imageUrl as getImageUrl } from "../../Api/config"; // EKLE


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
        image={getImageUrl(imageUrl)} // DEĞİŞTİR
        alt={name}
        sx={{ objectFit: "contain", p: 2 }}
      />
    </Box>
  );
}
