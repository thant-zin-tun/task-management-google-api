import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material";

import CustomFont from "./assets/fonts/myFont.ttf";

export const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
export const domain = import.meta.env.VITE_BASE_URL;

const theme = createTheme({
  typography: {
    fontFamily: "CustomFont",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'CustomFont';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url(${CustomFont}) format('ttf');
        }
      `,
    },
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 3,
      refetchOnReconnect: true,
      refetchOnMount: true,
      staleTime: 0,
      gcTime: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
