// src/pages/AboutPage.tsx
import { Box, Container, Grid, Typography, Paper, Stack, Button } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import colors from "../theme/color";

export default function AboutPage() {
  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: colors.softBg,
          py: 8,
          textAlign: "center",
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(91,46,255,0.03) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 32, md: 48 },
              fontWeight: 900,
              color: "#1a1a1a",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            Teknolojiyi <span style={{ color: colors.primary }}>Yeniden Keşfet</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontWeight: 400,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Nova olarak, en son teknolojiyi en uygun fiyatlarla ve kusursuz bir alışveriş deneyimiyle sunuyoruz. Geleceği bugünden deneyimlemeniz için buradayız.
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
             {/* Stats */}
            <Paper elevation={0} sx={{ p: 2, minWidth: 120, textAlign: 'center', border: '1px solid #eee' }}>
                <Typography variant="h4" fontWeight={800} color="primary">50K+</Typography>
                <Typography variant="body2" color="text.secondary">Mutlu Müşteri</Typography>
            </Paper>
             <Paper elevation={0} sx={{ p: 2, minWidth: 120, textAlign: 'center', border: '1px solid #eee' }}>
                <Typography variant="h4" fontWeight={800} color="primary">100%</Typography>
                <Typography variant="body2" color="text.secondary">Güvenli Ödeme</Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* VALUES SECTION */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ValueCard
              icon={<StorefrontIcon sx={{ fontSize: 40, color: colors.primary }} />}
              title="Geniş Ürün Yelpazesi"
              description="Binlerce teknolojik ürün arasından ihtiyacınız olanı en kolay şekilde bulun. Her zaman en yeni modeller stoklarımızda."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ValueCard
              icon={<LocalShippingIcon sx={{ fontSize: 40, color: colors.primary }} />}
              title="Hızlı & Güvenli Kargo"
              description="Siparişleriniz özenle paketlenir ve en kısa sürede kapınıza teslim edilir. Kargo sürecini anlık takip edebilirsiniz."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ValueCard
              icon={<SupportAgentIcon sx={{ fontSize: 40, color: colors.primary }} />}
              title="7/24 Müşteri Desteği"
              description="Satış öncesi ve sonrası her türlü sorunuz için uzman ekibimiz bir tık uzağınızda. Sizlere destek olmaktan mutluluk duyarız."
            />
          </Grid>
        </Grid>
      </Container>
    
      {/* MISSION SECTION */}
      <Box sx={{ bgcolor: "#F8FAFC", py: 10 }}>
          <Container maxWidth="md">
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="overline" fontWeight={700} color="primary">MİSYONUMUZ</Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
                        Teknolojiyi Herkes İçin Ulaşılabilir Kılıyoruz
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                        Amacımız sadece ürün satmak değil, teknolojinin hayatı kolaylaştıran yönlerini sizlerle buluşturmak. Kurulduğumuz günden beri dürüstlük, şeffaflık ve müşteri memnuniyetini en ön planda tutuyoruz.
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleOutlineIcon color="primary" />
                            <Typography fontWeight={600}>Orijinal Ürün Garantisi</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleOutlineIcon color="primary" />
                            <Typography fontWeight={600}>En İyi Fiyat Politikası</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleOutlineIcon color="primary" />
                            <Typography fontWeight={600}>Koşulsuz İade Hakkı</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                     <Box 
                        sx={{ 
                            height: 400, 
                            borderRadius: 4, 
                            bgcolor: colors.primary, 
                            backgroundImage: 'linear-gradient(45deg, #5B2EFF 0%, #9D85FF 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(91,46,255,0.2)'
                        }}
                     >
                        <Typography variant="h1" sx={{ color: 'white', opacity: 0.2, fontWeight: 900 }}>NOVA</Typography>
                     </Box>
                </Grid>
            </Grid>
          </Container>
      </Box>

      {/* CTA SECTION */}
        <Box sx={{ py: 10, textAlign: 'center' }}>
            <Container maxWidth="sm">
                <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
                    Alışverişe Başlamaya Hazır Mısın?
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    En yeni teknoloji ürünlerini keşfetmek için mağazamızı ziyaret etmeye ne dersin?
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ 
                        bgcolor: colors.primary, 
                        px: 6, 
                        py: 1.5,
                        borderRadius: 50,
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': { bgcolor: colors.primaryHover }
                    }}
                    href="/"
                >
                    Ürünleri Keşfet
                </Button>
            </Container>
        </Box>
    </Box>
  );
}

// Sub-component for Value Cards
function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
        border: "1px solid #eee",
        borderRadius: 4,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          borderColor: "transparent"
        },
      }}
    >
      <Box
        sx={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          bgcolor: colors.softBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {description}
      </Typography>
    </Paper>
  );
}