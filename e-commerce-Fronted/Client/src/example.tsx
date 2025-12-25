import { Box, Button, Stack, Typography } from "@mui/material";
import requests from "./Api/Api";

function Example() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* BAŞLIK */}
      <Typography variant="h4" fontWeight={800}>
        ERROR TEST
      </Typography>

      {/* BUTONLAR */}
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

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => requests.Errors.getValidationError()}
        >
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
