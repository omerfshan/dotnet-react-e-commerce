import { Box, Paper, Typography } from "@mui/material";
import colors from "../../../theme/color";

export default function ProductNotFound({ id }: { id?: string }) {
  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "100vh", py: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 3,
            border: "1px solid rgba(0,0,0,0.08)",
            bgcolor: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: 18 }}>Ürün bulunamadı.</Typography>
        
        </Paper>
      </Box>
    </Box>
  );
}
