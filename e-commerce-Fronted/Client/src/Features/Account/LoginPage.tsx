import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAsync } from "./accountSlice";
import { fetchCart } from "../../store/Slices/cartSlice";
import { fetchFavorites } from "../../store/Slices/favoriteSlice";
import type { AppDispatch } from "../../store/store";


import colors from "../../theme/color";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  async function onSubmit(data: LoginFormValues) {
    try {
      await dispatch(loginAsync(data)).unwrap();
      await dispatch(fetchCart());
      await dispatch(fetchFavorites());
      toast.success("Giriş başarılı!");
      navigate("/");
    } catch (err) {
      // interceptor hallediyor
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: colors.softBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={0}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={3}
          sx={{ color: colors.primary }}
        >
          NOVA
        </Typography>

        {/* Title */}
        <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
          Giriş Yap
        </Typography>

        {/* Email */}
        <TextField
          fullWidth
          placeholder="E-posta adresi"
          variant="outlined"
          sx={{ mb: 2 }}
          {...register("email", { required: "Email zorunlu" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Şifre"
          variant="outlined"
          sx={{ mb: 1 }}
          {...register("password", { required: "Şifre zorunlu" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password */}
        <Typography
          variant="body2"
          sx={{
            color: colors.primary,
            cursor: "pointer",
            mb: 2,
            fontWeight: 500,
          }}
        >
          Şifremi unuttum
        </Typography>

        {/* Login Button */}
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          sx={{
            backgroundColor: colors.primary,
            color: "white",
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            textTransform: "none",
            mb: 2.5,
            "&:hover": {
              backgroundColor: colors.primaryHover,
            },
          }}
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>

        {/* Register Link */}
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#6B7280" }}
        >
          Hesabınız yok mu?{" "}
          <Typography
            component="span"
            variant="body2"
            onClick={() => navigate("/register")}
            sx={{
              color: colors.primary,
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Kayıt Ol
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}