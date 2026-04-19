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

const colors = {
  primary: "#5B2EFF",
  primaryHover: "#7C5CFF",
  softBg: "#F6F7FB",
  newBadge: "#10B981",
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ STATE
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  // ✅ INPUT CHANGE
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  // ✅ SUBMIT
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("LOGIN DATA:", values);

    // 🔥 burada backend çağıracaksın
    // axios.post("/login", values)
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
        component="form" // ✅ form yaptık
        onSubmit={handleSubmit}
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
          name="email" // ❗ önemli
          value={values.email}
          onChange={handleInputChange}
          placeholder="E-posta adresi"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Password */}
        <TextField
          fullWidth
          name="password" // ❗ önemli
          value={values.password}
          onChange={handleInputChange}
          type={showPassword ? "text" : "password"}
          placeholder="Şifre"
          variant="outlined"
          sx={{ mb: 1 }}
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
          type="submit" // ✅ ENTER ile submit çalışır
          fullWidth
          sx={{
            backgroundColor: colors.primary,
            color: "white",
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            textTransform: "none",
            mb: 2,
            "&:hover": {
              backgroundColor: colors.primaryHover,
            },
          }}
        >
          Giriş Yap
        </Button>
      </Paper>
    </Box>
  );
}