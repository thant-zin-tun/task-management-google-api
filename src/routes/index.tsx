import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkToken } from "../services/check_token";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    const token = checkToken();
    if (token == undefined) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function RouteComponent() {
  return <div>Welcome</div>;
}
