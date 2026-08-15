import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Paper,
  Fade,
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

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await dispatch(logoutAsync());
    navigate("/");
  };

  const trigger = compact ? (
    /* ── Mobile icon button ── */
    <IconButton size="small" onClick={() => setOpen((v) => !v)}>
      <PersonOutlineIcon sx={{ color: user ? primary : "inherit" }} />
    </IconButton>
  ) : (
    /* ── Desktop text button ── */
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
  );

  return (
    <Box ref={anchorRef} sx={{ position: "relative", display: "inline-flex" }}>
      {trigger}

      <Fade in={open} timeout={160}>
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 220,
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1400,
            border: "1px solid #F3F4F6",
          }}
        >
          {user ? (
            /* ────── LOGGED IN ────── */
            <>
              <Box sx={{ px: 2.5, pt: 2, pb: 1.5, bgcolor: softBg }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <PersonIcon sx={{ color: "#fff", fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}
                    >
                      {user.userName || user.firstName || "Kullanıcı"}
                    </Typography>
                    {user.email && (
                      <Typography sx={{ fontSize: 11, color: "#9CA3AF" }}>
                        {user.email}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ p: 1 }}>
                {user.roles?.some(r => r === "Admin" || r === "Worker") && (
                  <>
                    <Typography variant="caption" sx={{ px: 2, pt: 1, pb: 0.5, display: "block", color: "text.secondary", fontWeight: 700 }}>
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
                    <Typography variant="caption" sx={{ px: 2, pt: 0.5, pb: 0.5, display: "block", color: "text.secondary", fontWeight: 700 }}>
                      HESABIM
                    </Typography>
                  </>
                )}
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
                <Divider sx={{ my: 0.5 }} />
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
            /* ────── LOGGED OUT ────── */
            <>
              <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
                <Typography
                  sx={{ fontWeight: 800, fontSize: 15, mb: 0.3 }}
                >
                  Hesabınıza girin
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                  Siparişlerinizi takip edin, favorilerinize ulaşın.
                </Typography>
              </Box>

              <Box sx={{ px: 1.5, pb: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
                {/* Log in */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => { setOpen(false); navigate("/login"); }}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    py: 1,
                    borderColor: primary,
                    color: primary,
                    "&:hover": { bgcolor: softBg, borderColor: primary },
                  }}
                >
                  Giriş Yap
                </Button>

                {/* Sign up */}
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AppRegistrationIcon />}
                  onClick={() => { setOpen(false); navigate("/register"); }}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    py: 1,
                    bgcolor: primary,
                    boxShadow: "none",
                    "&:hover": { bgcolor: primary, filter: "brightness(0.92)", boxShadow: "none" },
                  }}
                >
                  Kayıt Ol
                </Button>
              </Box>
            </>
          )}
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
        gap: 1.2,
        px: 1.5,
        py: 1,
        borderRadius: 2,
        cursor: "pointer",
        color: color ?? "inherit",
        fontWeight: 700,
        fontSize: 13,
        transition: "background 0.15s",
        "&:hover": { bgcolor: softBg, color: primary },
      }}
    >
      {icon}
      {label}
    </Box>
  );
}