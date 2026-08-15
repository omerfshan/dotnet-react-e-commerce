import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerAsync } from "./accountSlice";
import { fetchCart } from "../../store/Slices/cartSlice";
import { fetchFavorites } from "../../store/Slices/favoriteSlice";
import type { AppDispatch } from "../../store/store";
import colors from "../../theme/color";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  async function onSubmit(data: RegisterFormValues) {
    try {
      await dispatch(registerAsync(data)).unwrap();
      await dispatch(fetchCart());
      await dispatch(fetchFavorites());
      toast.success("Kayıt başarılı! Hoş geldiniz.");
      navigate("/");
    } catch (err) {
      // interceptor handles error display
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.softBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={0}
        sx={{
          width: 420,
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
        <Typography variant="h6" fontWeight={600} textAlign="center" mb={3}>
          Kayıt Ol
        </Typography>

        {/* First Name */}
        <TextField
          fullWidth
          placeholder="Ad"
          variant="outlined"
          sx={{ mb: 2 }}
          {...register("firstName", { required: "Ad alanı zorunludur" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          placeholder="Soyad"
          variant="outlined"
          sx={{ mb: 2 }}
          {...register("lastName", { required: "Soyad alanı zorunludur" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        {/* Email */}
        <TextField
          fullWidth
          placeholder="E-posta adresi"
          variant="outlined"
          type="email"
          sx={{ mb: 2 }}
          {...register("email", {
            required: "E-posta alanı zorunludur",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Geçerli bir e-posta adresi giriniz",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Şifre (En az 6 karakter)"
          variant="outlined"
          sx={{ mb: 3 }}
          {...register("password", {
            required: "Şifre alanı zorunludur",
            minLength: {
              value: 6,
              message: "Şifre en az 6 karakter olmalıdır",
            },
          })}
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

        {/* Register Button */}
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
            fontSize: 16,
            mb: 2.5,
            "&:hover": {
              backgroundColor: colors.primaryHover,
            },
          }}
        >
          {isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </Button>

        {/* Login redirect link */}
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#6B7280" }}
        >
          Zaten hesabınız var mı?{" "}
          <Typography
            component="span"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{
              color: colors.primary,
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Giriş Yap
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}
