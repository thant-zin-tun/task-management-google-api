import { useContext } from "react";
import { TaskContext } from "../context/global_state";

export const useTaskHook = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
