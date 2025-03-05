import { createContext, Dispatch, SetStateAction } from "react";

type TaskContextType = {
  taskListID: string | null;
  updateTasks: (id: string) => void;
  setTaskListID: Dispatch<SetStateAction<string | null>>;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
