import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import { Task } from "../../types/tast-types";
import ToDoCard from "./TaskDetailCard";
import EmptyTask from "../../assets/empty.png";
import Error from "../../assets/error.png";

type TaskCardType = {
  tasks: Task[] | undefined;
  isPending: boolean;
  isError: boolean;
};

const TaskCard: React.FC<TaskCardType> = ({ tasks, isPending, isError }) => {
  return (
    <>
      {isPending ? (
        <Grid2
          container
          spacing={2}
          sx={{ mt: 1, height: "100%", width: "100%" }}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={50} />
          </Box>
        </Grid2>
      ) : isError ? (
        <Grid2
          container
          spacing={2}
          sx={{ mt: 1, height: "100%", width: "100%" }}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <img src={Error} alt="Empty Task" loading="lazy" />
            <Typography variant="h6" color="textSecondary">
              Something went wrong!.
            </Typography>
          </Box>
        </Grid2>
      ) : tasks?.length == 0 ? (
        <Grid2
          container
          spacing={2}
          sx={{ mt: 1, height: "100%", width: "100%" }}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <img src={EmptyTask} alt="Empty Task" loading="lazy" />
            <Typography variant="h6" color="textSecondary">
              No Task Found
            </Typography>
          </Box>
        </Grid2>
      ) : (
        <Grid2
          container
          spacing={2}
          sx={{ mt: 1, width: "100%" }}
          display="flex"
          justifyContent={"start"}
          alignItems={"start"}
        >
          {tasks?.map((task: Task, index) => (
            <ToDoCard
              title={task.title}
              status={task.status}
              notes={task.notes}
              key={index}
              id={task.id}
            />
          ))}
        </Grid2>
      )}
    </>
  );
};

export default TaskCard;
