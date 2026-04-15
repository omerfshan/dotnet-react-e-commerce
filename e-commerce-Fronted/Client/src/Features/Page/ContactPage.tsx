// src/pages/ContactPage.tsx
import { Box, Container, Grid, Typography, Paper, Stack, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import colors from "../theme/color";

export default function ContactPage() {
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
            İletişime <span style={{ color: colors.primary }}>Geçin</span>
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
            Sorularınız, önerileriniz veya iş birlikleri için buradayız. Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
          </Typography>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          {/* LEFT COLUMN: INFO */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>
              İletişim Bilgileri
            </Typography>
            
            <Stack spacing={3}>
                <ContactInfoCard 
                    icon={<EmailIcon sx={{ color: colors.primary }} />}
                    title="E-posta"
                    content="destek@nova.com.tr"
                    subContent="7/24 Bize yazabilirsiniz"
                />
                 <ContactInfoCard 
                    icon={<PhoneIcon sx={{ color: colors.primary }} />}
                    title="Telefon"
                    content="+90 850 123 45 67"
                    subContent="Hafta içi: 09:00 - 18:00"
                />
                 <ContactInfoCard 
                    icon={<LocationOnIcon sx={{ color: colors.primary }} />}
                    title="Ofis"
                    content="Maslak Mah. Büyükdere Cad. No:123"
                    subContent="Sarıyer, İstanbul, Türkiye"
                />
            </Stack>

            {/* Social Proof / Trust Badge (Optional) */}
            <Box sx={{ mt: 6, p: 3, bgcolor: '#F8F9FA', borderRadius: 4, border: '1px dashed #ddd' }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Müşteri Temsilcisi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ortalama yanıt süremiz: <strong style={{ color: colors.newBadge }}>15 Dakika</strong>
                </Typography>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: FORM */}
          <Grid size={{ xs: 12, md: 7 }}>
             <Paper 
                elevation={0}
                sx={{ 
                    p: 4, 
                    borderRadius: 4, 
                    border: '1px solid #eee',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.02)'
                }}
             >
                <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
                  Bize Mesaj Gönderin
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Adınız Soyadınız" variant="outlined" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="E-posta Adresiniz" variant="outlined" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Konu" variant="outlined" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField 
                            fullWidth 
                            label="Mesajınız" 
                            multiline 
                            rows={4} 
                            variant="outlined" 
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button 
                            variant="contained" 
                            size="large" 
                            fullWidth
                            sx={{ 
                                bgcolor: colors.primary, 
                                py: 1.5,
                                fontSize: 16,
                                fontWeight: 700,
                                textTransform: 'none',
                                borderRadius: 3,
                                '&:hover': { bgcolor: colors.primaryHover }
                            }}
                        >
                            Mesajı Gönder
                        </Button>
                    </Grid>
                </Grid>
             </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ SECTION */}
      <Box sx={{ bgcolor: "#F8FAFC", py: 10 }}>
        <Container maxWidth="md">
            <Typography variant="h4" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>
                Sıkça Sorulan Sorular
            </Typography>
            <Typography color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                Merak ettiklerinizin cevaplarını burada bulabilirsiniz.
            </Typography>

            <Stack spacing={2}>
                <FaqAccordion 
                    question="Siparişimi iptal edebilir miyim?" 
                    answer="Evet, siparişiniz kargoya verilmeden önce 'Hesabım > Siparişlerim' menüsünden iptal edebilirsiniz." 
                />
                <FaqAccordion 
                    question="Kargo ücreti ne kadar?" 
                    answer="1500 TL üzeri alışverişlerinizde kargo ücretsizdir. Altındaki siparişler için sabit kargo ücreti uygulanır." 
                />
                <FaqAccordion 
                    question="İade süreci nasıl işliyor?" 
                    answer="Ürünü teslim aldıktan sonra 14 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade kodu oluşturarak ücretsiz gönderebilirsiniz." 
                />
            </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// Sub-component for Contact Info
function ContactInfoCard({ icon, title, content, subContent }: { icon: React.ReactNode, title: string, content: string, subContent: string }) {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box 
                sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 3, 
                    bgcolor: colors.softBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                    {content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subContent}
                </Typography>
            </Box>
        </Box>
    );
}

// Sub-component for FAQ
function FaqAccordion({ question, answer }: { question: string, answer: string }) {
    return (
        <Accordion elevation={0} sx={{ border: '1px solid #eee', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography color="text.secondary">{answer}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}