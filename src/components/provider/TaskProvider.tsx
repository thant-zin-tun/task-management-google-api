import { useEffect, useState } from "react";
import { TaskContext } from "../../context/global_state";
import { useQuery } from "@tanstack/react-query";
import { Task, TaskListsArr } from "../../types/tast-types";
import {
  fetchTaskListsFunc,
  fetchTasksByTaskListIDFunc,
} from "../../services/apiServices";

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskListID, setTaskListID] = useState<string | null>(null);

  // Fetch Task Lists
  const { data: taskLists = [], isSuccess } = useQuery<TaskListsArr | []>({
    queryKey: ["tasklists"],
    queryFn: fetchTaskListsFunc,
  });
  // Fetch Tasks by TaskListID
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks", taskListID],
    queryFn: () => fetchTasksByTaskListIDFunc(taskListID!),
    enabled: !!taskListID,
  });

  const handelIDs = () => {
    let storageID = sessionStorage.getItem("task_list_id");
    if (storageID == null) {
      setTaskListID(taskLists?.[0]?.id);
      sessionStorage.setItem("task_list_id", taskLists?.[0]?.id);
    } else {
      setTaskListID(storageID);
    }
  };

  useEffect(() => {
    handelIDs();
  }, [isSuccess, taskListID, taskLists]);

  // Update TaskListID
  const updateTasks = async (id: string) => {
    if (taskListID !== id) {
      setTaskListID(id);
      sessionStorage.setItem("task_list_id", id);
    }
  };

  return (
    <TaskContext.Provider value={{ taskListID, taskLists, tasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
