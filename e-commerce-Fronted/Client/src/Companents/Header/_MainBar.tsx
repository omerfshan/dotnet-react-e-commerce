import {
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  InputBase,
  Badge,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

type Props = {
  primary: string;
  softBg: string;
  favoriteCount: number;
};

export default function MainBar({ primary, softBg, favoriteCount }: Props) {
  const navigate = useNavigate();

  const { cart } = useCart();

  // 🔥 quantity toplamı
  const cartCount =
    cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  // 🔥 badge style
  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: primary,
      color: "white",
      fontWeight: 700,
      minWidth: "20px",
      height: "20px",
      borderRadius: "50%",
      fontSize: "12px",
    },
  };

  return (
    <Container maxWidth="xl">
      <Toolbar
        sx={{
          px: { xs: 1.5, md: 0 },
          py: { xs: 1.2, md: 1.2 },
          minHeight: { xs: "auto", md: 72 },
          gap: 1.5,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* LOGO */}
        <Typography
          component={NavLink}
          to={"/"}
          sx={{
            fontWeight: 900,
            fontSize: { xs: 30, md: 38 },
            letterSpacing: 1.5,
            color: primary,
            cursor: "pointer",
            flexShrink: 0,
            order: { xs: 1, md: 0 },
            textDecoration: "none",
          }}
        >
          NOVA
        </Typography>

        {/* MOBİL */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            ml: "auto",
            gap: 0.5,
            order: { xs: 2, md: 0 },
          }}
        >
          <IconButton size="small"><PersonOutlineIcon /></IconButton>

          <IconButton size="small">
            <Badge badgeContent={favoriteCount} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          <IconButton size="small" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} sx={badgeStyle}>
              <ShoppingCartOutlinedIcon sx={{ color: primary }} />
            </Badge>
          </IconButton>
        </Box>

        {/* SEARCH */}
        <Box
          sx={{
            flexGrow: { xs: 0, md: 1 },
            flexBasis: { xs: "100%", md: "auto" },
            display: "flex",
            alignItems: "center",
            bgcolor: softBg,
            borderRadius: 999,
            px: 2,
            py: 1.1,
            mt: { xs: 1.1, md: 0 },
          }}
        >
          <InputBase
            placeholder="Ürün, kategori veya marka ara"
            sx={{ flex: 1, fontSize: 14 }}
          />
          <IconButton>
            <SearchIcon sx={{ color: primary }} />
          </IconButton>
        </Box>

        {/* DESKTOP */}
        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
          <Button startIcon={<PersonOutlineIcon />}>Hesabım</Button>

          <Button
            startIcon={
              <Badge badgeContent={favoriteCount} color="error">
                <FavoriteBorderIcon />
              </Badge>
            }
          >
            Favoriler
          </Button>

          <Button
            onClick={() => navigate("/cart")}
            startIcon={
              <Badge badgeContent={cartCount} sx={badgeStyle}>
                <ShoppingCartOutlinedIcon sx={{ color: primary }} />
              </Badge>
            }
          >
            Sepet
          </Button>
        </Stack>
      </Toolbar>
    </Container>
  );
}
