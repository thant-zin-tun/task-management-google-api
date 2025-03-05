import { Box, Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6" marginBlock={2}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to="/tasks">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
}
