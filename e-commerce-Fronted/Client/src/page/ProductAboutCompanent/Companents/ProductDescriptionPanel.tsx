import { Paper, Typography } from "@mui/material";


export default function ProductDescriptionPanel({ description }: { description?: string | null }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2.5,
        borderRadius: 3,
        p: { xs: 2, md: 2.5 },
        border: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "#fff",
      }}
    >
      <Typography sx={{ fontWeight: 900, fontSize: 16 }}>Ürün Açıklaması</Typography>
      <Typography
        sx={{
          mt: 1,
          fontSize: 13.5,
          color: "rgba(0,0,0,0.75)",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
        }}
      >
        {description || "Bu ürün için açıklama girilmemiş."}
      </Typography>
    </Paper>
  );
}
