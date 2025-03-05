import { useEffect, useState } from "react";
import { TaskContext } from "../../context/global_state";
import { queryClient } from "../../main";
import { getSessionStorage } from "../../utils/sessionStorage";

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskListID, setTaskListID] = useState<string | null>(null);
  // Update TaskListID
  const updateTasks = async (id: string) => {
    setTaskListID(id);
    sessionStorage.setItem("task_list_id", id);
    queryClient.invalidateQueries({
      queryKey: ["tasks", id],
      refetchType: "all",
    });
  };

  const handleTaskListID = () => {
    let taskListIDFromStorage = getSessionStorage("task_list_id");
    if (taskListIDFromStorage) {
      setTaskListID(taskListIDFromStorage);
    }
  };

  useEffect(() => {
    handleTaskListID();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        taskListID,
        updateTasks,
        setTaskListID,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
