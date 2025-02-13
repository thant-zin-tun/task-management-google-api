import {
  createFileRoute,
  redirect,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";

import google from "../assets/google.png";
import Cookies from "universal-cookie";
import { checkToken } from "../services/check_token";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { clientId, clientSecret } from "../main";
const cookies = new Cookies();

export const Route = createFileRoute("/signup")({
  component: SingUpScreen,
  beforeLoad: () => {
    const token = checkToken();
    if (token != undefined) {
      throw redirect({
        to: "/tasks",
      });
    }
  },
});

export function SingUpScreen() {
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      const { code } = response;
      try {
        const tokenResponse = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: "https://task-management-google-tasks-api.vercel.app",
          }
        );
        const ACT = tokenResponse.data.access_token;
        console.log("Google Tasks API Access Token:", ACT);
        cookies.set("ACT", ACT);
        router.navigate({ to: "/tasks", replace: true });
      } catch (error) {
        console.error("Token exchange error:", error);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/tasks",
  });
  return (
    <Box
      component="div"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      flexDirection="column"
      padding={2}
      minHeight={750}
      sx={{
        overflowBlock: "scroll",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        marginTop={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={600}>
          Create an account
        </Typography>
        <Typography variant="subtitle2" fontWeight={600}>
          Lorem ipsum dolor sit amet
        </Typography>
        <Box
          width={320}
          height={50}
          padding={1}
          display="flex"
          marginTop={15}
          justifyContent="start"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
          component="div"
          onClick={() => googleLogin()}
        >
          <Box width={25} height={25}>
            <img
              src={google}
              width={25}
              height={25}
              style={{ display: "inline" }}
            />
          </Box>
          <Box
            textAlign="center"
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Signup with Google
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component="div"
        display="flex"
        justifyContent="space-around"
        width="100%"
        marginBottom={4}
      >
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            I have already an account?
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            gutterBottom
            fontWeight={600}
            color="primary"
            sx={{
              textDecoration: "underline",
            }}
          >
            <Link to="/signin" color="default">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
