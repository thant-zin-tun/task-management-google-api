import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";

// import Textarea from "@mui/material";
import {
  DialogContentText,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useTaskHook } from "../hooks/useTaskHook";
import {
  createTasksDetailByID,
  deleteTasksDetailByID,
} from "../services/apiServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { queryClient } from "../main";
import { TaskListsArr } from "../types/tast-types";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  taskID?: string | undefined;
  taskLists?: TaskListsArr;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  setOpen,
  isCreate,
  taskID,
}) => {
  const { taskListID, taskLists } = useTaskHook();

  const [select, setSelect] = React.useState(false);

  const router = useRouter();

  const [action, setActions] = React.useState<string>("needActions");
  const [task_list_id, setTaskListID] = React.useState<string | null>(
    taskListID
  );

  const { isPending: deletePending, mutate: deleteMutate } = useMutation({
    mutationFn: ({
      taskListID,
      taskID,
    }: {
      taskListID: string;
      taskID: string;
    }) => {
      return deleteTasksDetailByID(taskListID!, taskID!);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      router.navigate({
        to: "/tasks",
      });
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
    },
  });

  const { isPending: createPending, mutate: createMutate } = useMutation({
    mutationFn: ({ title, notes }: { title: string; notes: string }) => {
      return createTasksDetailByID(task_list_id!, title, notes, action);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      setOpen(false);
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
    },
  });

  const handleOpen = () => {
    setSelect(true);
  };

  const handleClose = () => {
    setSelect(false);
  };

  return (
    <React.Fragment>
      {isCreate ? (
        <Dialog
          fullWidth
          fullScreen
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries()); //Select Options
              const title = formJson.title as string;
              const notes = formJson.notes as string;
              createMutate({ title, notes });
            },
          }}
        >
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <Autocomplete
              sx={{
                marginBottom: 2,
              }}
              open={select}
              onOpen={handleOpen}
              onClose={handleClose}
              blurOnSelect
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.title}
              onChange={(event, value: any) => {
                console.log(event);
                console.log("------");
                setTaskListID(value.id);
              }}
              options={taskLists!}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Select your task list title"
                  id="task_list_id"
                  name="task_list_id"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    },
                  }}
                />
              )}
            />
            <TextField
              required
              margin="dense"
              id="title"
              name="title"
              label="Task Title"
              type="text"
              fullWidth
              variant="outlined"
              sx={{
                marginBottom: 2,
              }}
            />
            <TextField
              disabled={false}
              required
              minRows={13}
              fullWidth
              multiline
              id="notes"
              name="notes"
              placeholder="Write down your task note"
              sx={{
                marginBlock: 4,
              }}
            />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="actions"
              id="actions"
              value={action}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setActions(event.target.value)
              }
            >
              <FormControlLabel
                value="needActions"
                control={<Radio />}
                label="Need Actions"
                name="actions"
              />
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
                name="actions"
              />
            </RadioGroup>
          </DialogContent>
          <DialogActions sx={{ marginBlock: "20px", marginInline: "10px" }}>
            <Button
              onClick={() => setOpen(false)}
              disabled={createPending}
              size="large"
              sx={{
                marginRight: 2,
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={createPending}
              loadingPosition="start"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
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
              Are you sure you want to delete these tasks in this task list?
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ marginBlock: "10px", marginInline: "10px" }}>
            <Button
              autoFocus
              onClick={() => setOpen(false)}
              disabled={deletePending}
              sx={{
                marginRight: 2,
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              loading={deletePending}
              loadingPosition="end"
              onClick={() =>
                deleteMutate({
                  taskID: taskID!,
                  taskListID: taskListID!,
                })
              }
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
      )}
    </React.Fragment>
  );
};

export default CreateTaskDialog;

[
  {
    id: 1,
    title: "Hello",
  },
  {
    id: 2,
    title: "Hello2",
  },
];
