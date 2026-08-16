import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Paper,
  Fade,
  Drawer,
  Avatar,
  Chip,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/ hooks";
import { logoutAsync } from "../../Features/Account/accountSlice";

type Props = {
  primary: string;
  softBg: string;
  /** Pass true to render as a compact icon (mobile) */
  compact?: boolean;
};

export default function AccountMenu({ primary, softBg, compact = false }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Close on outside click for desktop dropdown
  useEffect(() => {
    if (!open || compact) return;
    function handleClick(e: MouseEvent) {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, compact]);

  const handleLogout = async () => {
    setOpen(false);
    await dispatch(logoutAsync());
    navigate("/");
  };

  const menuContent = user ? (
    /* ────── LOGGED IN CONTENT ────── */
    <>
      <Box sx={{ p: 2, bgcolor: softBg, borderRadius: compact ? 3 : 0, mb: compact ? 1.5 : 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: primary,
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {(user.firstName?.[0] || user.userName?.[0] || "U").toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>
              {user.firstName || user.userName || "Kullanıcı"}
            </Typography>
            {user.email && (
              <Typography noWrap sx={{ fontSize: 12, color: "#64748B", mt: 0.2 }}>
                {user.email}
              </Typography>
            )}
            {user.roles && user.roles.length > 0 && (
              <Chip
                label={user.roles.join(", ")}
                size="small"
                sx={{
                  mt: 0.6,
                  height: 18,
                  fontSize: 10,
                  fontWeight: 800,
                  bgcolor: "rgba(91,46,255,0.12)",
                  color: primary,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {!compact && <Divider />}

      <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {user.roles?.some((r) => r === "Admin" || r === "Worker") && (
          <>
            <Typography
              variant="caption"
              sx={{ px: 1.5, pt: 1, pb: 0.5, display: "block", color: "#64748B", fontWeight: 800, letterSpacing: 0.5 }}
            >
              YÖNETİM
            </Typography>
            <MenuItem
              icon={<AdminPanelSettingsIcon fontSize="small" />}
              label="Yönetim Paneli"
              onClick={() => { setOpen(false); navigate("/admin"); }}
              primary={primary}
              softBg={softBg}
            />
            <MenuItem
              icon={<ShoppingBagIcon fontSize="small" />}
              label="Tüm Müşteri Siparişleri"
              onClick={() => { setOpen(false); navigate("/admin", { state: { tab: 0 } }); }}
              primary={primary}
              softBg={softBg}
            />
            <MenuItem
              icon={<PersonIcon fontSize="small" />}
              label="Kullanıcı Yönetimi"
              onClick={() => { setOpen(false); navigate("/admin", { state: { tab: 1 } }); }}
              primary={primary}
              softBg={softBg}
            />
            <MenuItem
              icon={<HomeIcon fontSize="small" />}
              label="Ürün Yönetimi"
              onClick={() => { setOpen(false); navigate("/admin", { state: { tab: 2 } }); }}
              primary={primary}
              softBg={softBg}
            />
            <Divider sx={{ my: 1 }} />
          </>
        )}

        <Typography
          variant="caption"
          sx={{ px: 1.5, pt: 0.5, pb: 0.5, display: "block", color: "#64748B", fontWeight: 800, letterSpacing: 0.5 }}
        >
          HESABIM
        </Typography>
        <MenuItem
          icon={<PersonOutlineIcon fontSize="small" />}
          label="Profil Bilgileri"
          onClick={() => { setOpen(false); navigate("/profile", { state: { tab: 0 } }); }}
          primary={primary}
          softBg={softBg}
        />
        <MenuItem
          icon={<HomeIcon fontSize="small" />}
          label="Adreslerim"
          onClick={() => { setOpen(false); navigate("/profile", { state: { tab: 1 } }); }}
          primary={primary}
          softBg={softBg}
        />
        <MenuItem
          icon={<ShoppingBagIcon fontSize="small" />}
          label="Siparişlerim"
          onClick={() => { setOpen(false); navigate("/profile", { state: { tab: 2 } }); }}
          primary={primary}
          softBg={softBg}
        />
        <MenuItem
          icon={<LockIcon fontSize="small" />}
          label="Güvenlik & Şifre"
          onClick={() => { setOpen(false); navigate("/profile", { state: { tab: 3 } }); }}
          primary={primary}
          softBg={softBg}
        />

        <Divider sx={{ my: 1 }} />

        <MenuItem
          icon={<LogoutIcon fontSize="small" />}
          label="Çıkış Yap"
          onClick={handleLogout}
          primary="#EF4444"
          softBg="#FEF2F2"
          color="#EF4444"
        />
      </Box>
    </>
  ) : (
    /* ────── LOGGED OUT CONTENT ────── */
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 0.5 }}>
          Hesabınıza Giriş Yapın
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#64748B" }}>
          Siparişlerinizi takip edin, favorilerinize ve adreslerinize kolayca ulaşın.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => { setOpen(false); navigate("/login"); }}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 800,
            fontSize: 14,
            py: 1.2,
            bgcolor: primary,
            boxShadow: "none",
            "&:hover": { bgcolor: primary, filter: "brightness(0.92)", boxShadow: "none" },
          }}
        >
          Giriş Yap
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AppRegistrationIcon />}
          onClick={() => { setOpen(false); navigate("/register"); }}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 800,
            fontSize: 14,
            py: 1.2,
            borderColor: primary,
            color: primary,
            "&:hover": { bgcolor: softBg, borderColor: primary },
          }}
        >
          Kayıt Ol
        </Button>
      </Box>
    </Box>
  );

  // 📱 Mobile View: Drawer
  if (compact) {
    return (
      <>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <PersonOutlineIcon sx={{ color: user ? primary : "inherit" }} />
        </IconButton>

        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: "82%",
              maxWidth: 320,
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            },
          }}
        >
          {/* Drawer Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: primary }}>
              NOVA
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {menuContent}
          </Box>
        </Drawer>
      </>
    );
  }

  // 💻 Desktop View: Floating dropdown
  return (
    <Box ref={anchorRef} sx={{ position: "relative", display: "inline-flex" }}>
      <Button
        startIcon={<PersonOutlineIcon />}
        onClick={() => setOpen((v) => !v)}
        sx={{
          fontWeight: 700,
          color: open || user ? primary : "inherit",
          textTransform: "none",
          borderRadius: 999,
          px: 1.5,
          "&:hover": { color: primary, bgcolor: softBg },
        }}
      >
        {user ? (user.firstName || user.userName || "Hesabım") : "Hesabım"}
      </Button>

      <Fade in={open} timeout={160}>
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 240,
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1400,
            border: "1px solid #F3F4F6",
          }}
        >
          {menuContent}
        </Paper>
      </Fade>
    </Box>
  );
}

/* ── Reusable menu row ── */
function MenuItem({
  icon,
  label,
  onClick,
  primary,
  softBg,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary: string;
  softBg: string;
  color?: string;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.4,
        px: 1.5,
        py: 1.1,
        borderRadius: 2,
        cursor: "pointer",
        color: color ?? "#1E293B",
        fontWeight: 700,
        fontSize: 13.5,
        transition: "all 0.15s",
        "&:hover": { bgcolor: softBg, color: primary },
        "&:active": { transform: "scale(0.98)" },
      }}
    >
      {icon}
      <span>{label}</span>
    </Box>
  );
}