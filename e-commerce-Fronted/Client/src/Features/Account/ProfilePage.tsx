import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Tabs,
  Tab,
  Chip,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import { useAppSelector } from "../../store/ hooks";
import { useNavigate, useLocation } from "react-router-dom";
import colors from "../../theme/color";
import { toast } from "react-toastify";
import requests from "../../Api/Api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfilePage() {
  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.tab !== undefined ? Number(location.state.tab) : 0;
  const [tabValue, setTabValue] = useState(initialTab);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setTabValue(Number(location.state.tab));
    }
  }, [location.state]);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Address states
  const [addressTitle, setAddressTitle] = useState("Ev Adresim");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("İstanbul");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Orders state
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      requests.Account.getProfile(),
      requests.Orders.getOrders()
    ])
      .then(([profile, userOrders]) => {
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setEmail(profile.email || "");
        setPhoneNumber(profile.phoneNumber || "");
        setAddressTitle(profile.addressTitle || "Ev Adresim");
        setFullAddress(profile.fullAddress || "");
        setCity(profile.city || "");
        setOrders(userOrders || []);
      })
      .catch((err) => {
        console.error("Profile load error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={2}>
            Oturum Açmanız Gerekiyor
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Profil sayfanızı görüntülemek için lütfen giriş yapın.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
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
            Giriş Yap
          </Button>
        </Paper>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requests.Account.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        addressTitle,
        fullAddress,
        city,
      });
      toast.success("Profil bilgileriniz veritabanına kaydedildi.");
    } catch (err: any) {
      toast.error(err?.message || "Profil güncellenirken bir hata oluştu.");
    }
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requests.Account.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        addressTitle,
        fullAddress,
        city,
      });
      toast.success("Adres bilgileriniz veritabanına kaydedildi.");
    } catch (err: any) {
      toast.error(err?.message || "Adres güncellenirken bir hata oluştu.");
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır!");
      return;
    }
    try {
      await requests.Account.changePassword({ currentPassword, newPassword });
      toast.success("Şifreniz veritabanında başarıyla değiştirildi.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Şifre değiştirme başarısız. Mevcut şifrenizi kontrol edin.");
    }
  };

  const getInitials = () => {
    if (firstName) return firstName.substring(0, 2).toUpperCase();
    if (user.userName) return user.userName.substring(0, 2).toUpperCase();
    return "U";
  };

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "85vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Profile Summary Card */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            border: "1px solid #E5E7EB",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "white",
                color: colors.primary,
                fontWeight: 800,
                fontSize: 28,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              {getInitials()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: 0.5 }}>
                {firstName ? `${firstName} ${lastName}` : user.userName || "Kullanıcı"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.8, opacity: 0.9 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body1" fontWeight={500}>
                  {email || user.email || "E-posta belirtilmedi"}
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Müşteri Hesabı"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 700,
                px: 1,
                py: 0.5,
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>
        </Paper>

        {/* Main Content Layout */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #E5E7EB",
            overflow: "hidden",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                px: 3,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  py: 2,
                  "&.Mui-selected": { color: colors.primary },
                },
                "& .MuiTabs-indicator": { bgcolor: colors.primary, height: 3 },
              }}
            >
              <Tab icon={<PersonIcon />} iconPosition="start" label="Profil Bilgileri" />
              <Tab icon={<HomeIcon />} iconPosition="start" label="Adreslerim" />
              <Tab icon={<ShoppingBagIcon />} iconPosition="start" label="Siparişlerim" />
              <Tab icon={<LockIcon />} iconPosition="start" label="Güvenlik & Şifre" />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "white" }}>
            {/* TAB 1: Profil Bilgileri */}
            <CustomTabPanel value={tabValue} index={0}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Kişisel Bilgiler
              </Typography>
              <Box component="form" onSubmit={handleProfileSave}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Ad"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Soyad"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="E-posta Adresi"
                      value={email}
                      disabled
                      helperText="E-posta adresi değiştirilemez."
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Telefon Numarası"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+90 (5XX) XXX XX XX"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        bgcolor: colors.primary,
                        color: "white",
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { bgcolor: colors.primaryHover },
                      }}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CustomTabPanel>

            {/* TAB 2: Adreslerim */}
            <CustomTabPanel value={tabValue} index={1}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Teslimat Adresleri
              </Typography>
              <Box component="form" onSubmit={handleAddressSave}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Adres Başlığı"
                      value={addressTitle}
                      onChange={(e) => setAddressTitle(e.target.value)}
                      placeholder="Örn: Ev, İş Yeri"
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Şehir / İlçe"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Örn: Kadıköy / İstanbul"
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Açık Adres"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="Mahalle, Cadde, Sokak, Daire No"
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        mt: 3,
                        bgcolor: colors.primary,
                        color: "white",
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { bgcolor: colors.primaryHover },
                      }}
                    >
                      Adresi Veritabanına Kaydet
                    </Button>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        borderColor: colors.primary,
                        bgcolor: colors.softBg,
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight={700} color={colors.primary}>
                            {addressTitle || "Adres Başlığı"}
                          </Typography>
                          <Chip label="Varsayılan" size="small" color="primary" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {fullAddress || "Henüz açık adres girilmedi."}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          Şehir: {city || "Belirtilmedi"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </CustomTabPanel>

            {/* TAB 3: Siparişlerim */}
            <CustomTabPanel value={tabValue} index={2}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Geçmiş Siparişlerim ({orders.length})
              </Typography>
              {orders.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    textAlign: "center",
                    bgcolor: colors.softBg,
                    borderRadius: 3,
                    border: "1px dashed #CBD5E1",
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 60, color: "#94A3B8", mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} color="#475569" mb={1}>
                    Henüz Siparişiniz Bulunmuyor
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Verdiğiniz tüm siparişlerin durumunu buradan kolayca takip edebilirsiniz.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/catalog")}
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: 999,
                      px: 4,
                      py: 1,
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { bgcolor: colors.primaryHover },
                    }}
                  >
                    Alışverişe Başla
                  </Button>
                </Paper>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {orders.map((ord: any) => (
                    <Paper
                      key={ord.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        bgcolor: "white",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 1,
                          pb: 2,
                          mb: 2,
                          borderBottom: "1px solid #F3F4F6",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1" fontWeight={800} color={colors.primary}>
                            Sipariş kódú: {ord.orderNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Tarih: {new Date(ord.orderDate).toLocaleDateString("tr-TR")} {new Date(ord.orderDate).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Chip
                            label={
                              ord.status === "Processing" ? "Hazırlanıyor" :
                              ord.status === "Shipped" ? "Kargoya Verildi" :
                              ord.status === "Delivered" ? "Teslim Edildi" : "Alındı"
                            }
                            color={ord.status === "Delivered" ? "success" : "primary"}
                            size="small"
                            sx={{ fontWeight: 700 }}
                          />
                          <Typography variant="h6" fontWeight={800} color="#111827">
                            {ord.grandTotal?.toLocaleString("tr-TR")} TL
                          </Typography>
                        </Box>
                      </Box>

                      {/* Order Items */}
                      <Grid container spacing={2}>
                        {ord.orderItems?.map((item: any) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={item.productId}>
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                              <Box
                                component="img"
                                src={`http://localhost:5232/images/${item.productImageUrl}`}
                                onError={(e: any) => { e.target.src = "/images/placeholder.jpg"; }}
                                sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "cover" }}
                              />
                              <Box>
                                <Typography variant="body2" fontWeight={700}>
                                  {item.productName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Adet: {item.quantity} × {item.price?.toLocaleString("tr-TR")} TL
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
                </Box>
              )}
            </CustomTabPanel>

            {/* TAB 4: Güvenlik & Şifre */}
            <CustomTabPanel value={tabValue} index={3}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Şifre Değiştir
              </Typography>
              <Box component="form" onSubmit={handlePasswordSave} sx={{ maxWidth: 480 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Mevcut Şifre"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Yeni Şifre"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Yeni Şifre (Tekrar)"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    bgcolor: colors.primary,
                    color: "white",
                    borderRadius: 3,
                    px: 4,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: colors.primaryHover },
                  }}
                >
                  Şifreyi Güncelle
                </Button>
              </Box>
            </CustomTabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
