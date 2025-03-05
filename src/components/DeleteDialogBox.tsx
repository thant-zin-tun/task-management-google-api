import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";

import { useTaskHook } from "../hooks/useTaskHook";
import { useMutation } from "@tanstack/react-query";
import { deleteTaskList, deleteTasksDetailByID } from "../services/apiServices";
import { queryClient } from "../main";
import { useRouter } from "@tanstack/react-router";
import { showErrorToastBoxFunc, showSuccessToastBoxFunc } from "../utils/toast";

const DeleteDialogBox = ({
  open,
  setOpen,
  identifier,
  isDeleteTaskDetail,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  identifier: string;
  isDeleteTaskDetail: boolean;
}) => {
  const { taskListID } = useTaskHook();
  const router = useRouter();

  //Detete Task Detail
  const {
    isPending: deleteTaskDetailsPending,
    mutate: deleteTaskDetailsMutate,
  } = useMutation({
    mutationFn: async ({
      taskListID,
      taskID,
    }: {
      taskListID: string;
      taskID: string;
    }) => {
      return await deleteTasksDetailByID(taskListID!, taskID!);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks", taskListID],
        refetchType: "all",
      });
      showSuccessToastBoxFunc("Successfully delete");
      router.navigate({
        to: "/tasks",
      });
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
    },
  });

  //Delete Task List
  const { isPending: deleteTaskListPending, mutate: deleteTaskListMutate } =
    useMutation({
      mutationFn: async ({ taskListID }: { taskListID: string }) => {
        return await deleteTaskList(taskListID!);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["taskLists"],
        });
        showSuccessToastBoxFunc("Successfully delete");
        setOpen(false);
      },
      onError: (error: any) => {
        showErrorToastBoxFunc(error);
      },
    });

  return (
    <>
      <Dialog open={open} aria-labelledby="draggable-dialog-title">
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          sx={{ color: "red" }}
        >
          Delete
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {isDeleteTaskDetail
              ? "Are you sure you want to delete this task?"
              : "Are you sure you want to delete these tasks in this task list?"}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ marginBlock: "10px", marginInline: "10px" }}>
          <Button
            autoFocus
            onClick={() => setOpen(false)}
            disabled={deleteTaskDetailsPending || deleteTaskListPending}
            sx={{
              marginRight: 2,
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            loading={deleteTaskDetailsPending || deleteTaskListPending}
            loadingPosition="end"
            onClick={async () => {
              if (isDeleteTaskDetail) {
                deleteTaskDetailsMutate({
                  taskID: identifier!,
                  taskListID: taskListID!,
                });
              } else {
                deleteTaskListMutate({
                  taskListID: identifier!,
                });
              }
            }}
            color="error"
            sx={{
              marginRight: 2,
              textTransform: "capitalize",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialogBox;
