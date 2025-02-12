import { useTaskHook } from "../../hooks/useTaskHook";
import { Task } from "../../types/tast-types";
import ToDoCard from "./ToDoCard";

const TaskCard = () => {
  const { tasks } = useTaskHook();
  return (
    <>
      {tasks?.map((task: Task, index) => (
        <ToDoCard
          title={task.title}
          status={task.status}
          notes={task.notes}
          index={index}
          key={index}
          id={task.id}
        />
      ))}
    </>
  );
};

export default TaskCard;
