import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Box, Container } from "@mui/material";
import TaskProvider from "../components/provider/TaskProvider";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <TaskProvider>
        <Container maxWidth="md">
          <Box sx={{ width: "100%", height: "100vh", overflowBlock: "hidden" }}>
            <Outlet />
          </Box>
        </Container>
      </TaskProvider>
    </React.Fragment>
  ),
});
