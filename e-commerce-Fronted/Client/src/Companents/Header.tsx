import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  InputBase,
  Badge,
  Divider,
  Chip,
  Stack,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type NavItem = { label: string; isNew?: boolean };

export default function Header() {
  const topLinks = ["Kampanyalar", "Satıcı Ol", "Hakkımızda", "Destek"];

  const categories: NavItem[] = [
    { label: "Moda" },
    { label: "Teknoloji" },
    { label: "Ev & Yaşam" },
    { label: "Bakım & Sağlık" },
    { label: "Spor" },
    { label: "Market" },
    { label: "Popüler", isNew: true },
    { label: "Günün Fırsatı", isNew: true },
  ];

  const [openExplore, setOpenExplore] = useState(false);

  // 🎨 BİZE ÖZGÜ RENKLER
  const primary = "#5B2EFF";
  const primaryHover = "#7C5CFF";
  const softBg = "#F6F7FB";
  const newBadge = "#10B981";

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#fff", color: "#111" }}>
      {/* ================= ÜST TOP LINKS (md+) ================= */}
      <Box
        sx={{
          borderBottom: "1px solid #E5E7EB",
          display: { xs: "none", md: "flex" }, // ✅ mobilde kaldır -> daha temiz
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            height: 30,
            whiteSpace: "nowrap",
          }}
        >
          {topLinks.map((t) => (
            <Button
              key={t}
              sx={{
                fontSize: 12,
                color: "#6B7280",
                textTransform: "none",
                minWidth: "auto",
                py: 0,
                lineHeight: 1,
              }}
            >
              {t}
            </Button>
          ))}
        </Box>
      </Box>

      {/* ================= ANA BAR ================= */}
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            px: { xs: 1.5, md: 0 },
            py: { xs: 1.2, md: 1.2 },
            minHeight: { xs: "auto", md: 72 }, // ✅ fazla boşluğu öldür
            gap: 1.5,
            flexWrap: { xs: "wrap", md: "nowrap" },
            alignItems: "center",
          }}
        >
          {/* LOGO */}
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: 30, md: 38 },
              letterSpacing: 1.5,
              color: primary,
              cursor: "pointer",
              userSelect: "none",
              flexShrink: 0,

              // ✅ mobilde 1. satırda kalsın
              order: { xs: 1, md: 0 },
            }}
          >
            NOVA
          </Typography>

          {/* MOBİL AKSİYONLAR (md altı) */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              ml: "auto",
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
              order: { xs: 2, md: 0 }, // ✅ logo yanında
            }}
          >
            <IconButton size="small" sx={{ color: "#6B7280" }}>
              <PersonOutlineIcon />
            </IconButton>

            <IconButton size="small" sx={{ color: "#6B7280" }}>
              <FavoriteBorderIcon />
            </IconButton>

            <IconButton size="small" sx={{ color: "#6B7280" }}>
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* SEARCH */}
          <Box
            component="form"
            sx={{
              // ✅ mobilde ikinci satır full genişlik
              flexGrow: { xs: 0, md: 1 },
              flexBasis: { xs: "100%", md: "auto" },
              width: { xs: "100%", md: "auto" },
              order: { xs: 3, md: 0 },

              display: "flex",
              alignItems: "center",
              bgcolor: softBg,
              borderRadius: 999,
              px: 2,
              py: 1.1,
              mt: { xs: 1.1, md: 0 }, // ✅ mobilde araya nefes
              border: "1px solid transparent",
              "&:focus-within": { borderColor: primary },

              minWidth: 0,
            }}
          >
            <InputBase
              placeholder="Ürün, kategori veya marka ara"
              sx={{
                flex: 1,
                fontSize: 14,
                minWidth: 0,
                color: "#111",
                "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
              }}
            />
            <IconButton>
              <SearchIcon sx={{ color: primary }} />
            </IconButton>
          </Box>

          {/* DESKTOP ACTIONS (md+) */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              startIcon={<PersonOutlineIcon />}
              sx={{
                color: "#111",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 999,
              }}
            >
              Hesabım
            </Button>

            <Button
              startIcon={<FavoriteBorderIcon />}
              sx={{
                color: "#111",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 999,
              }}
            >
              Favoriler
            </Button>

            <Button
              startIcon={
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
              sx={{
                color: "#111",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 999,
              }}
            >
              Sepet
            </Button>
          </Stack>
        </Toolbar>
      </Container>

      <Divider />

      {/* ================= KATEGORİ BAR ================= */}
      <Box sx={{ bgcolor: "#fff" }}>
        <Toolbar
          sx={{
            minHeight: 48, // ✅ daha temiz yükseklik
            px: { xs: 1.5, md: 0 },
            justifyContent: { xs: "flex-start", md: "center" },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              gap: { xs: 2, md: 3 },
              overflowX: "auto",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": { display: "none" },
              width: "100%",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
            }}
          >
            {/* KEŞFET (SADECE XS) */}
           <Box
  sx={{
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    gap: 1,

    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)", // ✅ tam orta
    zIndex: 2,

    // ✅ taşarsa tek satır kalsın
    whiteSpace: "nowrap",
  }}
>

              <Button
                startIcon={<MenuIcon />}
                onClick={() => setOpenExplore((p) => !p)}
                sx={{
                  fontWeight: 900,
                  color: primary,
                  textTransform: "none",
                  px: 0.5,
                  minWidth: "auto",
                }}
              >
                KEŞFET
              </Button>

              <Chip
                label="Yeni"
                size="small"
                sx={{
                  bgcolor: newBadge,
                  color: "#fff",
                  fontWeight: 800,
                  height: 20,
                }}
              />
            </Box>

            {/* KATEGORİLER (SADECE MD+) */}
            <Box
              sx={{
                display: { xs: "none", md: "inline-flex" },
                gap: 3,
                alignItems: "center",
              }}
            >
              {categories.map((c) => (
                <Box
                  key={c.label}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                    color: "#111",
                    py: 1,
                    borderBottom: "2px solid transparent",
                    "&:hover": {
                      color: primaryHover,
                      borderBottomColor: primaryHover,
                    },
                    flexShrink: 0,
                  }}
                  onClick={() => console.log("category:", c.label)}
                >
                  <span>{c.label}</span>
                  {c.isNew && (
                    <Chip
                      label="Yeni"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        bgcolor: newBadge,
                        color: "#fff",
                        fontWeight: 900,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Toolbar>

        {/* KEŞFET AÇILAN MENÜ (SADECE XS) */}
        <Collapse in={openExplore} timeout={180} unmountOnExit>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              px: 1.5,
              pb: 1.2,
            }}
          >
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              {categories.map((c, idx) => (
                <Box
                  key={c.label}
                  onClick={() => {
                    console.log("category:", c.label);
                    setOpenExplore(false);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1.5,
                    py: 1.1,
                    fontWeight: 800,
                    bgcolor: "#fff",
                    cursor: "pointer",
                    ...(idx !== 0 ? { borderTop: "1px solid #F1F5F9" } : {}),
                    "&:active": { bgcolor: "#F8FAFC" },
                  }}
                >
                  <span>{c.label}</span>
                  {c.isNew && (
                    <Chip
                      label="Yeni"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        bgcolor: newBadge,
                        color: "#fff",
                        fontWeight: 900,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider />
    </AppBar>
  );
}
