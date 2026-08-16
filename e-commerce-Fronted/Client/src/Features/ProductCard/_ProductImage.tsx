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
        image={getImageUrl(imageUrl)}
        alt={name}
        sx={{
          height: { xs: 140, sm: 170, md: 200 },
          objectFit: "contain",
          p: { xs: 1, md: 2 }
        }}
      />
    </Box>
  );
}
