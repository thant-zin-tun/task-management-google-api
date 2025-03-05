import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkToken } from "../services/check_token";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  beforeLoad: () => {
    const token = checkToken();
    if (token == undefined) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function IndexComponent() {
  return <h1>Hello World</h1>;
}
