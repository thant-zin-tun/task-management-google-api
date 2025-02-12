import { createContext } from "react";
import { Task, TaskListsArr } from "../types/tast-types";

type TaskContextType = {
  taskListID: string | null;
  taskLists: TaskListsArr | [];
  tasks: Task[] | [];
  updateTasks: (id: string) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
