import {
  Alert,
  AlertTitle,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import requests from "./Api/Api";

function Example() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handle422 = () => {
    setValidationErrors([]);

    requests.Errors.getValidationError()
      .then(() => {
        // normalde buraya düşmez, çünkü endpoint 422 döndürüyor
      })
      .catch((err) => {
        // interceptor 422 için string[] reject ediyorsa burası çalışır
        if (Array.isArray(err)) {
          setValidationErrors(err);
          return;
        }

        // safety: backend farklı format döndürürse
        const errorsObj = err?.data?.errors ?? err?.errors;
        if (errorsObj) {
          const list: string[] = [];
          for (const key in errorsObj) list.push(...errorsObj[key]);
          setValidationErrors(list);
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight={800}>
        ERROR TEST
      </Typography>

      {/* ✅ 422 VALIDATION ALERT */}
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 720 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((e, i) => (
              <ListItem key={i} disableGutters>
                <ListItemText primary={e} />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => requests.Errors.getNotFound()}
        >
          404
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={() => requests.Errors.getBadRequest()}
        >
          400
        </Button>

        <Button
          variant="outlined"
          color="info"
          onClick={() => requests.Errors.getUnauthorized()}
        >
          401
        </Button>

        {/* ✅ BURASI DEĞİŞTİ */}
        <Button variant="outlined" color="secondary" onClick={handle422}>
          422
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => requests.Errors.getServerError()}
        >
          500
        </Button>
      </Stack>
    </Box>
  );
}

export default Example;
