import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { useNavigate, useLocation } from "react-router-dom";
import colors from "../../theme/color";
import { toast } from "react-toastify";
import requests from "../../Api/Api";
import { fetchProducts } from "../../store/Slices/productsSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = location.state?.tab !== undefined ? Number(location.state.tab) : 0;
  const [tabValue, setTabValue] = useState(initialTab);
  const [loading, setLoading] = useState(true);

  // Admin / Worker check
  const isUserAdmin = user?.roles?.includes("Admin");
  const isUserWorker = user?.roles?.includes("Worker");

  // Data states
  const [orders, setOrders] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // Add User Modal State
  const [openUserModal, setOpenUserModal] = useState(false);
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("Customer");

  // Product Modal (Add / Edit) State
  const [openProductModal, setOpenProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("5");
  const [productImageUrl, setProductImageUrl] = useState("1.jpg");
  const [productIsActive, setProductIsActive] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setTabValue(Number(location.state.tab));
    }
  }, [location.state?.tab, location.key]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allOrders, allUsers, allProducts] = await Promise.all([
        requests.Orders.getAllOrders(),
        requests.Admin.getUsers(),
        requests.Catalog.list(),
      ]);
      setOrders(allOrders || []);
      setUsersList(allUsers || []);
      setProducts(allProducts || []);
    } catch (err: any) {
      console.error("Admin load error", err);
      toast.error(err?.message || "Veriler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || (!isUserAdmin && !isUserWorker)) return;
    loadData();
  }, [user]);

  if (!user || (!isUserAdmin && !isUserWorker)) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 4, border: "1px solid #E5E7EB" }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 70, color: colors.primary, mb: 2 }} />
          <Typography variant="h5" fontWeight={700} mb={2}>
            Yetkisiz Erişim
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Bu panele sadece Admin veya Worker yetkisine sahip kullanıcılar erişebilir.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ bgcolor: colors.primary, borderRadius: 999, px: 4, py: 1.2, fontWeight: 700, textTransform: "none" }}
          >
            Ana Sayfaya Dön
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

  // Handle Order Status Update
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await requests.Orders.updateOrderStatus(orderId, newStatus);
      toast.success("Sipariş durumu güncellendi.");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      toast.error(err?.message || "Durum güncellenirken hata oluştu.");
    }
  };

  // Handle Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requests.Admin.createUser({
        firstName: newUserFirstName,
        lastName: newUserLastName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      });
      toast.success("Kullanıcı başarıyla oluşturuldu.");
      setOpenUserModal(false);
      setNewUserFirstName("");
      setNewUserLastName("");
      setNewUserEmail("");
      setNewUserPassword("");
      loadData();
    } catch (err: any) {
      const errorMsg = typeof err === "string" ? err : (err?.data || err?.message || "Kullanıcı oluşturulamadı.");
      toast.error(errorMsg);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (targetUser: any) => {
    if (targetUser.role === "Admin") {
      toast.error("Admin rolündeki kullanıcılar güvenlik nedeniyle silinemez!");
      return;
    }

    if (!window.confirm(`${targetUser.firstName} ${targetUser.lastName} kullanıcısını silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      await requests.Admin.deleteUser(targetUser.id);
      toast.success("Kullanıcı silindi.");
      setUsersList((prev) => prev.filter((u) => u.id !== targetUser.id));
    } catch (err: any) {
      toast.error(err?.message || err?.data || "Kullanıcı silinirken hata oluştu.");
    }
  };

  // Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await requests.Catalog.uploadImage(file);
      setProductImageUrl(result.fileName);
      toast.success("Fotoğraf başarıyla yüklendi.");
    } catch (err: any) {
      toast.error(err?.message || "Fotoğraf yüklenirken bir hata oluştu.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Open Product Modal (New or Edit)
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductStock("");
    setProductCategory("5");
    setProductImageUrl("1.jpg");
    setProductIsActive(true);
    setOpenProductModal(true);
  };

  const handleOpenEditProduct = (p: any) => {
    setEditingProductId(p.id);
    setProductName(p.name || "");
    setProductDescription(p.description || "");
    setProductPrice(p.price ? p.price.toString() : "");
    setProductStock(p.stock ? p.stock.toString() : "");
    setProductCategory(p.categories && p.categories[0] ? p.categories[0].categoryId.toString() : "5");
    setProductImageUrl(p.imageUrl || "1.jpg");
    setProductIsActive(p.isActive !== false);
    setOpenProductModal(true);
  };

  // Handle Toggle Publish (Yayında / Yayından Kaldır)
  const handleTogglePublish = async (p: any) => {
    const newActiveState = !p.isActive;
    const productPayload = {
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      imageUrl: p.imageUrl,
      isActive: newActiveState,
      categoryIds: p.categories?.map((c: any) => c.categoryId) || [5],
    };

    try {
      await requests.Catalog.update(p.id, productPayload);
      toast.success(newActiveState ? "Ürün yayınlandı." : "Ürün yayından kaldırıldı.");
      loadData();
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err?.message || "Yayından kaldırma işlemi başarısız.");
    }
  };

  // Handle Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
      imageUrl: productImageUrl,
      isActive: productIsActive,
      categoryIds: [parseInt(productCategory)],
    };

    try {
      if (editingProductId) {
        await requests.Catalog.update(editingProductId, productPayload);
        toast.success("Ürün başarıyla güncellendi.");
      } else {
        await requests.Catalog.create(productPayload);
        toast.success("Yeni ürün başarıyla eklendi ve yayına alındı.");
      }
      setOpenProductModal(false);
      loadData();
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err?.message || "Ürün kaydedilirken hata oluştu.");
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: number, name: string) => {
    if (!window.confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) return;

    try {
      await requests.Catalog.delete(id);
      toast.success("Ürün silindi.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      dispatch(fetchProducts());
    } catch (err: any) {
      toast.error(err?.message || "Ürün silinemedi.");
    }
  };

  return (
    <Box sx={{ bgcolor: colors.softBg, minHeight: "90vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Summary */}
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
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AdminPanelSettingsIcon sx={{ fontSize: 44 }} />
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Yönetim Paneli
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Hoş geldiniz, {user.firstName || user.userName} ({isUserAdmin ? "Sistem Yöneticisi (Admin)" : "Personel (Worker)"})
                </Typography>
              </Box>
            </Box>
            <Chip
              label={isUserAdmin ? "Admin Yetkisi" : "Worker Yetkisi"}
              sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 800, fontSize: 14 }}
            />
          </Box>
        </Paper>

        {/* Dashboard Tabs */}
        <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                px: 3,
                "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: 15, py: 2 },
                "& .MuiTabs-indicator": { bgcolor: colors.primary, height: 3 },
              }}
            >
              <Tab icon={<ShoppingBagIcon />} iconPosition="start" label={`Tüm Siparişler (${orders.length})`} />
              <Tab icon={<PeopleIcon />} iconPosition="start" label={`Üye & Kullanıcılar (${usersList.length})`} />
              <Tab icon={<InventoryIcon />} iconPosition="start" label={`Ürünler (${products.length})`} />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "white" }}>
            {/* TAB 0: TÜM SİPARİŞLER & DURUM DÜZENLEME */}
            <CustomTabPanel value={tabValue} index={0}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Tüm Müşteri Siparişleri
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: colors.softBg }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Sipariş No</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Müşteri / İletişim</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tarih</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tutar</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Durum Güncelle</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((ord) => (
                      <TableRow key={ord.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: colors.primary }}>
                          {ord.orderNumber}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700}>
                            {ord.firstName} {ord.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ord.city} - {ord.phoneNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(ord.orderDate).toLocaleDateString("tr-TR")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800 }}>
                          {ord.grandTotal?.toLocaleString("tr-TR")} TL
                        </TableCell>
                        <TableCell>
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <Select
                              value={ord.status || "Processing"}
                              onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                              sx={{ borderRadius: 2, fontWeight: 700, fontSize: 13 }}
                            >
                              <MuiMenuItem value="Processing">Hazırlanıyor</MuiMenuItem>
                              <MuiMenuItem value="Shipped">Yolda / Kargoda</MuiMenuItem>
                              <MuiMenuItem value="Delivered">Teslim Edildi</MuiMenuItem>
                              <MuiMenuItem value="Cancelled">İptal Edildi</MuiMenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>

            {/* TAB 1: KULLANICI & ÜYE YÖNETİMİ */}
            <CustomTabPanel value={tabValue} index={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Kayıtlı Kullanıcılar
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenUserModal(true)}
                  sx={{ bgcolor: colors.primary, borderRadius: 3, fontWeight: 700, textTransform: "none" }}
                >
                  Yeni Kullanıcı Ekle
                </Button>
              </Box>

              <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: colors.softBg }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Ad Soyad</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>E-posta</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">İşlem</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersList.map((u) => {
                      const isTargetAdmin = u.role === "Admin";
                      const canDelete = !isTargetAdmin;
                      return (
                        <TableRow key={u.id} hover>
                          <TableCell sx={{ fontWeight: 700 }}>
                            {u.firstName} {u.lastName}
                          </TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={u.role}
                              color={u.role === "Admin" ? "error" : u.role === "Worker" ? "warning" : "default"}
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {canDelete && u.id !== user.token && (
                              <Button
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteUser(u)}
                                sx={{ textTransform: "none", fontWeight: 700 }}
                              >
                                Sil
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>

            {/* TAB 2: ÜRÜN YÖNETİMİ, DÜZENLEME & FOTOĞRAF YÜKLEME */}
            <CustomTabPanel value={tabValue} index={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Katalog Ürünleri
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddProduct}
                  sx={{ bgcolor: colors.primary, borderRadius: 3, fontWeight: 700, textTransform: "none" }}
                >
                  Yeni Ürün Ekle
                </Button>
              </Box>

              <Grid container spacing={3}>
                {products.map((p) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                    <Paper elevation={0} sx={{ p: 2, border: "1px solid #E5E7EB", borderRadius: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Box
                          component="img"
                          src={`http://localhost:5232/images/${p.imageUrl}`}
                          onError={(e: any) => { e.target.src = "/images/placeholder.jpg"; }}
                          sx={{ width: 64, height: 64, borderRadius: 2, objectFit: "cover" }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography fontWeight={700} noWrap sx={{ maxWidth: 140 }}>
                            {p.name}
                          </Typography>
                          <Typography variant="body2" color={colors.primary} fontWeight={800}>
                            {p.price?.toLocaleString("tr-TR")} TL
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Stok: {p.stock} adet
                          </Typography>
                        </Box>
                      </Box>

                      {/* Product Action Buttons */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1, borderTop: "1px solid #F3F4F6" }}>
                        <Chip
                          label={p.isActive !== false ? "Yayında" : "Yayından Kaldırıldı"}
                          color={p.isActive !== false ? "success" : "default"}
                          size="small"
                          sx={{ fontWeight: 700, fontSize: 11 }}
                        />
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Tooltip title={p.isActive !== false ? "Yayından Kaldır" : "Yayına Al"}>
                            <IconButton
                              size="small"
                              color={p.isActive !== false ? "warning" : "success"}
                              onClick={() => handleTogglePublish(p)}
                            >
                              {p.isActive !== false ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Ürünü Düzenle">
                            <IconButton size="small" color="primary" onClick={() => handleOpenEditProduct(p)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Ürünü Sil">
                            <IconButton size="small" color="error" onClick={() => handleDeleteProduct(p.id, p.name)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CustomTabPanel>
          </Box>
        </Paper>
      </Container>

      {/* CREATE USER DIALOG */}
      <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Yeni Kullanıcı / Üye Ekle</DialogTitle>
        <Box component="form" onSubmit={handleCreateUser}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Ad" fullWidth required value={newUserFirstName} onChange={(e) => setNewUserFirstName(e.target.value)} />
            <TextField label="Soyad" fullWidth required value={newUserLastName} onChange={(e) => setNewUserLastName(e.target.value)} />
            <TextField label="E-posta" type="email" fullWidth required value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
            <TextField
              label="Şifre"
              type="password"
              fullWidth
              required
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              helperText="Şifre en az 6 karakter olmalı ve 1 Rakam (0-9) içermelidir (Örn: Pass123!)."
            />
            <FormControl fullWidth>
              <InputLabel>Rol Seçiniz</InputLabel>
              <Select value={newUserRole} label="Rol Seçiniz" onChange={(e) => setNewUserRole(e.target.value)}>
                <MuiMenuItem value="Customer">Customer (Müşteri)</MuiMenuItem>
                <MuiMenuItem value="Worker">Worker (Personel)</MuiMenuItem>
                {isUserAdmin && <MuiMenuItem value="Admin">Admin (Yönetici)</MuiMenuItem>}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenUserModal(false)}>İptal</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: colors.primary }}>Kaydet</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* CREATE / EDIT PRODUCT DIALOG */}
      <Dialog open={openProductModal} onClose={() => setOpenProductModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>
          {editingProductId ? "Ürünü Düzenle" : "Kataloğa Yeni Ürün Ekle"}
        </DialogTitle>
        <Box component="form" onSubmit={handleSaveProduct}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Ürün Adı" fullWidth required value={productName} onChange={(e) => setProductName(e.target.value)} />
            <TextField label="Açıklama" multiline rows={2} fullWidth required value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField label="Fiyat (TL)" type="number" fullWidth required value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField label="Stok Adedi" type="number" fullWidth required value={productStock} onChange={(e) => setProductStock(e.target.value)} />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select value={productCategory} label="Kategori" onChange={(e) => setProductCategory(e.target.value)}>
                <MuiMenuItem value="1">Telefon & Aksesuar</MuiMenuItem>
                <MuiMenuItem value="2">Bilgisayar & Tablet</MuiMenuItem>
                <MuiMenuItem value="3">Oyun & Konsol</MuiMenuItem>
                <MuiMenuItem value="4">Kulaklık & Ses</MuiMenuItem>
                <MuiMenuItem value="5">Akıllı Saat & Giyilebilir</MuiMenuItem>
              </Select>
            </FormControl>

            {/* Photo Upload Section */}
            <Box sx={{ border: "1px dashed #CBD5E1", p: 2, borderRadius: 2, textAlign: "center", bgcolor: colors.softBg }}>
              {productImageUrl && (
                <Box
                  component="img"
                  src={`http://localhost:5232/images/${productImageUrl}`}
                  onError={(e: any) => { e.target.src = "/images/placeholder.jpg"; }}
                  sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover", mb: 1.5 }}
                />
              )}
              <Box>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  disabled={uploadingImage}
                  sx={{ borderRadius: 999, textTransform: "none", fontWeight: 700 }}
                >
                  {uploadingImage ? "Yükleniyor..." : "Cihazdan Fotoğraf Yükle"}
                  <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Yüklenen Görsel: {productImageUrl}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenProductModal(false)}>İptal</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: colors.primary }}>
              {editingProductId ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
