import { createFileRoute, Outlet } from "@tanstack/react-router";
import TaskProvider from "../../components/provider/TaskProvider";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
}
