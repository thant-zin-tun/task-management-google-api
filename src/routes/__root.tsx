import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Box, Container } from "@mui/material";
import NotFound from "../components/NotFound";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: () => (
    <React.Fragment>
      <Container maxWidth="md">
        <Box sx={{ width: "100%", height: "100vh", overflowBlock: "hidden" }}>
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  ),
});
