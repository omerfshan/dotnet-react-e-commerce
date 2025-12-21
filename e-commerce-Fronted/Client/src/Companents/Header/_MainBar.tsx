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

type Props = {
  primary: string;
  softBg: string;
   favoriteCount: number
};


export default function MainBar({ primary, softBg, favoriteCount }: Props)  {
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
          sx={{
            fontWeight: 900,
            fontSize: { xs: 30, md: 38 },
            letterSpacing: 1.5,
            color: primary,
            cursor: "pointer",
            flexShrink: 0,
            order: { xs: 1, md: 0 },
          }}
        >
          NOVA
        </Typography>

        {/* MOBİL AKSİYONLAR */}
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
          <IconButton size="small">
            <Badge badgeContent={0}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* SEARCH */}
        <Box
          sx={{
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

        {/* DESKTOP ACTIONS */}
        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
          <Button startIcon={<PersonOutlineIcon />}>Hesabım</Button>
          <Button
            startIcon=
            {
              <Badge badgeContent={favoriteCount} color="error">
                <FavoriteBorderIcon />
              </Badge>
            }
>
  Favoriler
</Button>

          <Button
            startIcon={
              <Badge badgeContent={0}>
                <ShoppingCartOutlinedIcon />
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
