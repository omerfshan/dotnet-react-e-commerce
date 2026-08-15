import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/color";
import { toast } from "react-toastify";
import requests from "../../Api/Api";
import { clearCart } from "../../store/Slices/cartSlice";

const steps = ["Adres & Teslimat", "Ödeme Bilgileri", "Sipariş Onayı"];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const cart = useAppSelector((state) => state.cart.cart);

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // Delivery / Address Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressTitle, setAddressTitle] = useState("Ev Adresim");
  const [city, setCity] = useState("İstanbul");
  const [fullAddress, setFullAddress] = useState("");
  const [shippingOption, setShippingOption] = useState("standard");

  // Payment Form State
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      toast.warning("Lütfen ödemeyi tamamlamak için giriş yapınız.");
      navigate("/login");
      return;
    }

    requests.Account.getProfile()
      .then((profile) => {
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setPhoneNumber(profile.phoneNumber || "");
        setAddressTitle(profile.addressTitle || "Ev Adresim");
        setCity(profile.city || "İstanbul");
        setFullAddress(profile.fullAddress || "");
      })
      .catch((err) => {
        console.error("Profile get error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, navigate]);

  const totalPrice =
    cart?.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  const shippingFee = shippingOption === "express" ? 49.99 : 0;
  const grandTotal = totalPrice + shippingFee;

  const handleNextStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullAddress || !city || !phoneNumber) {
      toast.error("Lütfen tüm adres ve iletişim alanlarını doldurunuz.");
      return;
    }

    // Save/Update user address to Backend
    try {
      await requests.Account.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        addressTitle,
        fullAddress,
        city,
      });
    } catch (e) {
      console.error("Address save error", e);
    }

    setActiveStep(1);
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolder || !cardNumber || !expireDate || !cvv) {
      toast.error("Lütfen kart bilgilerini eksiksiz giriniz.");
      return;
    }

    setIsSubmitting(true);
    try {
      const createdOrder = await requests.Orders.createOrder({
        firstName,
        lastName,
        phoneNumber,
        addressTitle,
        city,
        fullAddress,
        shippingOption,
      });

      setCompletedOrderNumber(createdOrder.orderNumber);
      dispatch(clearCart());
      setActiveStep(2);
      toast.success("Siparişiniz veritabanına başarıyla kaydedildi!");
    } catch (err: any) {
      toast.error(err?.message || "Sipariş oluşturulurken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  if (activeStep !== 2 && (!cart || cart.cartItems.length === 0)) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid #E5E7EB" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Sepetinizde Ürün Bulunmuyor
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Ödeme adımına geçmek için sepetinize ürün eklemelisiniz.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/catalog")}
            sx={{
              bgcolor: colors.primary,
              borderRadius: 999,
              px: 4,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: colors.primaryHover },
            }}
          >
            Alışverişe Başla
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "90vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Stepper Header */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: "1px solid #E5E7EB" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label.Mui-active": { color: colors.primary, fontWeight: 700 },
                    "& .MuiStepLabel-label.Mui-completed": { color: colors.primary, fontWeight: 700 },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* SUCCESS STEP (Sipariş Onayı) */}
        {activeStep === 2 ? (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, textAlign: "center", borderRadius: 4, border: "1px solid #E5E7EB" }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 90, color: "#10B981", mb: 2 }} />
            <Typography variant="h4" fontWeight={800} color="#111827" mb={1}>
              Siparişiniz Alındı!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
              Sipariş Numaranız: <strong>{completedOrderNumber}</strong>
            </Typography>

            <Box sx={{ maxWidth: 500, mx: "auto", bgcolor: colors.softBg, p: 3, borderRadius: 3, mb: 4, textAlign: "left" }}>
              <Typography variant="subtitle2" fontWeight={700} color={colors.primary} mb={1}>
                Teslimat Bilgileri
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {firstName} {lastName} - {phoneNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fullAddress}, {city} ({addressTitle})
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/profile", { state: { tab: 2 } })}
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontWeight: 700,
                  textTransform: "none",
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                Siparişlerime Git
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: colors.primary,
                  borderRadius: 999,
                  px: 4,
                  py: 1.2,
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: colors.primaryHover },
                }}
              >
                Ana Sayfaya Dön
              </Button>
            </Box>
          </Paper>
        ) : (
          /* STEP 0 & STEP 1 LAYOUT */
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              {activeStep === 0 && (
                <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <LocationOnIcon sx={{ color: colors.primary, fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={700}>
                      Teslimat ve Adres Bilgileri
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleNextStep1}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Ad"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Soyad"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Telefon Numarası"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="05XX XXX XX XX"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Adres Başlığı"
                          value={addressTitle}
                          onChange={(e) => setAddressTitle(e.target.value)}
                          placeholder="Ev, İş vb."
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Şehir / İlçe"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Kadıköy / İstanbul"
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          required
                          multiline
                          rows={3}
                          label="Açık Adres"
                          value={fullAddress}
                          onChange={(e) => setFullAddress(e.target.value)}
                          placeholder="Mahalle, Cadde, Sokak, No/Daire"
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <LocalShippingIcon sx={{ color: colors.primary, fontSize: 26 }} />
                      <Typography variant="h6" fontWeight={700}>
                        Kargo / Teslimat Seçeneği
                      </Typography>
                    </Box>

                    <FormControl component="fieldset">
                      <RadioGroup
                        value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value)}
                      >
                        <FormControlLabel
                          value="standard"
                          control={<Radio sx={{ color: colors.primary, "&.Mui-checked": { color: colors.primary } }} />}
                          label={
                            <Box>
                              <Typography fontWeight={700}>Standart Teslimat (Ücretsiz)</Typography>
                              <Typography variant="caption" color="text.secondary">
                                2-3 iş günü içerisinde adresinize teslim edilir.
                              </Typography>
                            </Box>
                          }
                          sx={{ mb: 1 }}
                        />
                        <FormControlLabel
                          value="express"
                          control={<Radio sx={{ color: colors.primary, "&.Mui-checked": { color: colors.primary } }} />}
                          label={
                            <Box>
                              <Typography fontWeight={700}>Hızlı Kargo (+49,99 TL)</Typography>
                              <Typography variant="caption" color="text.secondary">
                                Yarın kapınızda! Öncelikli teslimat.
                              </Typography>
                            </Box>
                          }
                        />
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                      <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/cart")}
                        sx={{ textTransform: "none", fontWeight: 700, color: "text.secondary" }}
                      >
                        Sepete Dön
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: colors.primary,
                          borderRadius: 3,
                          px: 4,
                          py: 1.2,
                          fontWeight: 700,
                          textTransform: "none",
                          "&:hover": { bgcolor: colors.primaryHover },
                        }}
                      >
                        Ödeme Adımına Geç
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}

              {activeStep === 1 && (
                <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <CreditCardIcon sx={{ color: colors.primary, fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={700}>
                      Kredi / Banka Kartı ile Ödeme
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleCompleteOrder}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          required
                          label="Kart Üzerindeki İsim"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="Ahmet Yılmaz"
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          required
                          label="Kart Numarası"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          inputProps={{ maxLength: 19 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          label="Son Kullanma Tarihi (AA/YY)"
                          value={expireDate}
                          onChange={(e) => setExpireDate(e.target.value)}
                          placeholder="12/28"
                          inputProps={{ maxLength: 5 }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          required
                          type="password"
                          label="CVV / Güvenlik Kodu"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          inputProps={{ maxLength: 3 }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                      <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => setActiveStep(0)}
                        sx={{ textTransform: "none", fontWeight: 700, color: "text.secondary" }}
                      >
                        Adres Adımına Dön
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          bgcolor: colors.primary,
                          borderRadius: 3,
                          px: 5,
                          py: 1.4,
                          fontWeight: 800,
                          fontSize: 16,
                          textTransform: "none",
                          "&:hover": { bgcolor: colors.primaryHover },
                        }}
                      >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : `Ödemeyi Yap (${grandTotal.toLocaleString("tr-TR")} TL)`}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}
            </Grid>

            {/* ORDER SUMMARY SIDEBAR */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #E5E7EB", bgcolor: "white" }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Sipariş Özeti
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 240, overflowY: "auto", mb: 2 }}>
                  {cart?.cartItems.map((item) => (
                    <Box key={item.productId} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <Box
                        component="img"
                        src={`http://localhost:5232/images/${item.imageUrl}`}
                        onError={(e: any) => { e.target.src = "/images/placeholder.jpg"; }}
                        sx={{ width: 48, height: 48, borderRadius: 2, objectFit: "cover" }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={700} noWrap sx={{ maxWidth: 160 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Adet: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={700}>
                        {(item.price * item.quantity).toLocaleString("tr-TR")} TL
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Ürünler Toplamı</Typography>
                  <Typography variant="body2" fontWeight={600}>{totalPrice.toLocaleString("tr-TR")} TL</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Kargo Ücreti</Typography>
                  <Typography variant="body2" fontWeight={600} color={shippingFee === 0 ? "#10B981" : "inherit"}>
                    {shippingFee === 0 ? "Ücretsiz" : `${shippingFee} TL`}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={800}>Toplam Tutar</Typography>
                  <Typography variant="h6" fontWeight={900} color={colors.primary}>
                    {grandTotal.toLocaleString("tr-TR")} TL
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
