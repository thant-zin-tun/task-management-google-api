import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { checkToken } from "../../../services/check_token";

import {
  AppBar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { ArrowBackIos } from "@mui/icons-material";
import { Grid } from "@mui/joy";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useTaskHook } from "../../../hooks/useTaskHook";
import { Task } from "../../../types/tast-types";
import { ChangeEvent, useReducer } from "react";
import { updateTasksDetailByID } from "../../../services/apiServices";
import { useMutation } from "@tanstack/react-query";

const style = {
  py: 0,
  px: 0,
  width: "100%",
  backgroundColor: "background.paper",
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 36,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    borderRadius: 36 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

export const Route = createFileRoute("/tasks/update/")({
  component: TaskEditDetail,
  validateSearch: (search: Task) => {
    return search;
  },
  beforeLoad: () => {
    const token = checkToken();
    if (token == undefined) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

type State = {
  taskTitle?: string;
  taskNotes?: string;
  taskStatus?: string;
};

type Action =
  | { type: "SET_TITLE"; payload?: string }
  | { type: "SET_NOTES"; payload?: string }
  | { type: "SET_STATUS"; payload?: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, taskTitle: action.payload };
    case "SET_NOTES":
      return { ...state, taskNotes: action.payload };
    case "SET_STATUS":
      return { ...state, taskStatus: action.payload };
    default:
      return state;
  }
};

function TaskEditDetail() {
  const { title, status, notes, id } = useSearch({ strict: false });
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    taskTitle: title,
    taskNotes: notes,
    taskStatus: status,
  });
  const { taskListID } = useTaskHook();

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return updateTasksDetailByID(
        taskListID!,
        id!,
        state.taskTitle!,
        state.taskNotes!,
        state.taskStatus!
      );
    },
    onSuccess: async () => {
      router.navigate({ to: "/tasks/$id", params: { id: id! } });
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
    },
  });

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      bgcolor="ButtonShadow"
      padding={2}
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Header with date selector */}
      <AppBar
        position="sticky"
        elevation={1}
        color="default"
        sx={{
          paddingInline: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <Link
            to="/tasks/$id"
            params={{ id: id! }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ArrowBackIos />
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Typography variant="h6">Edit task</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        flexGrow={1}
        display="flex"
        alignItems="start"
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {/* Task Cards */}
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={state.taskTitle}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_TITLE", payload: event.target.value })
            }
            disabled={isPending}
          />
          <Grid xs={12} component="div" paddingInlineEnd={1} spacing={2}>
            <Card
              elevation={3}
              variant="outlined"
              sx={{
                width: "100%",
              }}
            >
              <Box
                padding={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <List sx={style}>
                  <ListItem>
                    <ListItemText primary="Starts" />
                    <Box marginLeft={20}>
                      <Chip
                        color="primary"
                        label="July 24, 2025"
                        sx={{ marginRight: 1 }}
                      ></Chip>
                      <Chip color="primary" label="9:00 AM"></Chip>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText primary="Ends" />
                    <Box marginLeft={20}>
                      <Chip
                        color="primary"
                        label="July 24, 2025"
                        sx={{ marginRight: 1 }}
                      ></Chip>
                      <Chip color="primary" label="9:00 AM"></Chip>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText primary="Status" />
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isPending}
                      onClick={() => {
                        if (state.taskStatus == "needsAction") {
                          dispatch({
                            type: "SET_STATUS",
                            payload: "completed",
                          });
                        } else {
                          dispatch({
                            type: "SET_STATUS",
                            payload: "needsAction",
                          });
                        }
                      }}
                      color={
                        state.taskStatus == "completed" ? "success" : "error"
                      }
                      sx={{
                        color: "white",
                        marginRight: 2,
                        textTransform: "capitalize",
                      }}
                    >
                      {state.taskStatus == "needsAction" ? "Todo" : "Completed"}
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                </List>
              </Box>
            </Card>
            <Card
              elevation={3}
              variant="outlined"
              sx={{
                width: "100%",
                marginBlock: 2,
              }}
            >
              <Box
                padding={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} component="h6">
                  Notification
                </Typography>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                />
              </Box>
            </Card>
            <Card
              elevation={3}
              variant="outlined"
              sx={{
                width: "100%",
                marginBlock: 2,
              }}
            >
              <Box
                padding={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  disabled={isPending}
                  required
                  minRows={15}
                  value={state.taskNotes}
                  fullWidth
                  multiline
                  id="notes"
                  name="notes"
                  placeholder="Write down your task note"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: "SET_NOTES", payload: event.target.value })
                  }
                />
              </Box>
            </Card>
          </Grid>
        </Grid2>
      </Box>

      <Divider sx={{ marginBlock: 2 }} />
      {/* Footer button */}
      <Box
        marginTop={2}
        textAlign="center"
        bgcolor="ButtonShadow"
        display="flex"
        height={70}
        justifyContent="center"
        component="div"
        alignItems="center"
        sx={{
          cursor: "pointer",
        }}
        onClick={() => mutate()}
      >
        {isPending ? "Updating ..." : "Update Task"}
      </Box>
    </Box>
  );
}

// <TextField
//   disabled={false}
//   required
//   minRows={15}
//   fullWidth
//   multiline
//   id="notes"
//   name="notes"
//   placeholder="Write down your task note"
// />
// <RadioGroup
//   row
//   aria-labelledby="demo-row-radio-buttons-group-label"
//   name="actions"
//   id="actions"
//   value={action}
//   onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//     setActions(event.target.value)
//   }
// >
//   <FormControlLabel
//     value="needActions"
//     control={<Radio />}
//     label="Need Actions"
//     name="actions"
//   />
//   <FormControlLabel
//     value="completed"
//     control={<Radio />}
//     label="Completed"
//     name="actions"
//   />
// </RadioGroup>
