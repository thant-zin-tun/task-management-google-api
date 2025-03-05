import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";

// import dayjs from "dayjs";

// import { DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import Textarea from "@mui/material";
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useTaskHook } from "../hooks/useTaskHook";
import {
  createTaskList,
  createTasksDetailByID,
  updateTaskList,
} from "../services/apiServices";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../main";
import { TaskListsArr } from "../types/tast-types";
import { showErrorToastBoxFunc, showSuccessToastBoxFunc } from "../utils/toast";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskID?: string | undefined;
  taskLists?: TaskListsArr;
  isTaskCreate: string;
  updateValue?: string;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  setOpen,
  taskLists,
  taskID,
  isTaskCreate,
  updateValue,
}) => {
  const { taskListID } = useTaskHook();

  const [select, setSelect] = React.useState(false);
  const [currentTaskListIndex, setIndex] = React.useState<number>(0);

  const [action, setActions] = React.useState<string>("needActions");
  const [task_list_id, setTaskListID] = React.useState<string | null>(
    taskListID
  );

  //Create a task
  const { isPending: createTaskPending, mutate: createTaskMutate } =
    useMutation({
      mutationFn: ({ title, notes }: { title: string; notes: string }) => {
        const id =
          task_list_id == null
            ? taskLists?.[currentTaskListIndex].id
            : task_list_id!;
        return createTasksDetailByID(id!, title, notes, action);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        setOpen(false);
        showSuccessToastBoxFunc("Successfully create a task");
      },
      onError: (error: any) => {
        showErrorToastBoxFunc(error);
      },
    });

  // Create a tasklist
  const { isPending: creaetTaskListPending, mutate: createTaskListMutate } =
    useMutation({
      mutationFn: ({ title }: { title: string }) => {
        return createTaskList(title);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["taskLists"],
        });
        showSuccessToastBoxFunc("Successfully create a task list");
        setOpen(false);
      },
      onError: (error: any) => {
        showErrorToastBoxFunc(error);
      },
    });

  // Update a tasklist
  const { isPending: updateTaskListPending, mutate: updateTaskListMutate } =
    useMutation({
      mutationFn: ({
        title,
        tasklist_id,
      }: {
        title: string;
        tasklist_id: string;
      }) => {
        return updateTaskList(title, tasklist_id!);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["taskLists"],
        });
        setOpen(false);
        showSuccessToastBoxFunc("Successfully update task list title");
      },
      onError: (error: any) => {
        alert(error);
        showErrorToastBoxFunc(error);
      },
    });

  const handleOpen = () => {
    setSelect(true);
  };

  const handleClose = () => {
    setSelect(false);
  };

  React.useEffect(() => {
    const currentTaskListIndex =
      taskLists?.findIndex((task) => task.id === taskListID) ?? -1;
    setIndex(currentTaskListIndex);
  }, [taskListID, taskLists]);

  return (
    <React.Fragment>
      {isTaskCreate == "tasks" ? (
        <Dialog
          fullWidth
          fullScreen
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const title = formJson.title as string;
              const notes = formJson.notes as string;
              createTaskMutate({ title, notes });
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
              defaultValue={taskLists?.[currentTaskListIndex]}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                console.log(event);
                setTaskListID(newValue!.id);
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
              minRows={9}
              fullWidth
              multiline
              id="notes"
              name="notes"
              placeholder="Write down your task note"
              sx={{
                marginBlock: 4,
              }}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                flexWrap="wrap"
              >
                <fieldset
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingInline: 10,
                    paddingBlock: 20,
                    borderRadius: "4px",
                  }}
                >
                  <legend>Repeats every</legend>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginInlineEnd={2}
                    flexGrow={"grow"}
                  >
                    <TextField
                      required
                      margin="dense"
                      sx={{
                        width: "80px",
                      }}
                      id="day"
                      name="day"
                      type="number"
                      defaultValue={1}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Autocomplete
                      open={select}
                      onOpen={handleOpen}
                      onClose={handleClose}
                      blurOnSelect
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.title}
                      onChange={(value: any) => {
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
                  </Box>
                </fieldset>
                <fieldset
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingInline: 10,
                    paddingBlock: 20,
                    borderRadius: "4px",
                  }}
                >
                  <legend>Start</legend>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginInlineEnd={2}
                    flexGrow={"grow"}
                  >
                    <DemoItem label="Time">
                      <MobileTimePicker defaultValue={dayjs()} />
                    </DemoItem>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <DemoItem label="Date">
                      <DatePicker
                        value={value}
                        onChange={(newValue: any) => setValue(newValue)}
                      />
                    </DemoItem>
                  </Box>
                </fieldset>
                <fieldset
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingInline: 10,
                    paddingBlock: 20,
                    borderRadius: "4px",
                  }}
                >
                  <legend>End</legend>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginInlineEnd={2}
                    flexGrow={"grow"}
                  >
                    <DemoItem label="Time">
                      <MobileTimePicker defaultValue={dayjs()} />
                    </DemoItem>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <DemoItem label="Date">
                      <DatePicker
                        value={value}
                        onChange={(newValue: any) => setValue(newValue)}
                      />
                    </DemoItem>
                  </Box>
                </fieldset>
              </Box>
            </LocalizationProvider> */}
            <Box width={"100%"} display="flex" justifyContent="center" mt={10}>
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ marginBlock: "20px", marginInline: "10px" }}>
            <Button
              onClick={() => setOpen(false)}
              disabled={createTaskPending}
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
              loading={createTaskPending}
              disabled={createTaskPending}
              loadingPosition="start"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      ) : isTaskCreate == "tasklists" ? (
        <Dialog
          fullWidth
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const title = formJson.taskListTitle as string;
              createTaskListMutate({ title });
            },
          }}
        >
          <DialogTitle>Create Task List</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="taskListTitle"
              name="taskListTitle"
              label="Task List Title"
              type="text"
              fullWidth
              variant="outlined"
              sx={{
                marginBottom: 2,
              }}
            />
          </DialogContent>
          <DialogActions sx={{ marginBlock: "20px", marginInline: "10px" }}>
            <Button
              onClick={() => setOpen(false)}
              disabled={creaetTaskListPending}
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
              loading={creaetTaskListPending}
              disabled={creaetTaskListPending}
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
        <Dialog
          fullWidth
          open={open}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const title = formJson.taskListTitle as string;
              updateTaskListMutate({ title, tasklist_id: taskID! });
            },
          }}
        >
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="taskListTitle"
              name="taskListTitle"
              label="Task List Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={updateValue}
              sx={{
                marginBottom: 2,
              }}
            />
          </DialogContent>
          <DialogActions sx={{ marginBlock: "20px", marginInline: "10px" }}>
            <Button
              onClick={() => setOpen(false)}
              disabled={updateTaskListPending}
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
              loading={updateTaskListPending}
              loadingPosition="start"
              disabled={updateTaskListPending}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default CreateTaskDialog;
