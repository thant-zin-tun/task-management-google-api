import { createRoute, Link, redirect, useParams } from "@tanstack/react-router";
import { checkToken } from "../../services/check_token";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  Grid2,
  Card,
  List,
  ListItem,
  Divider,
  ListItemText,
  Chip,
  FormControlLabel,
  styled,
  CircularProgress,
} from "@mui/material";

import { useState } from "react";

import { ArrowBackIos, EditNote } from "@mui/icons-material";
import { Grid } from "@mui/joy";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Task } from "../../types/tast-types";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksDetailByID } from "../../services/apiServices";
import { useTaskHook } from "../../hooks/useTaskHook";
import { Route as TaskRootRoute } from ".";
import DeleteDialogBox from "../../components/DeleteDialogBox";

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
        backgroundColor: "primary.main",
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

export const Route = createRoute({
  getParentRoute: () => TaskRootRoute,
  path: "$id",
  component: TaskDetail,
  beforeLoad: () => {
    const token = checkToken();
    if (token == undefined) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function TaskDetail() {
  const { id } = useParams({ strict: false });
  const [open, setOpen] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<string | undefined>("");
  const { taskListID } = useTaskHook();

  const { data, isPending } = useQuery<Task>({
    queryKey: ["tasks_detail", taskListID, id],
    queryFn: () => fetchTasksDetailByID(taskListID!, id!),
    staleTime: 20 * 30 * 3600,
    refetchOnMount: false,
  });

  return (
    <>
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
        <DeleteDialogBox
          identifier={taskID!}
          open={open}
          setOpen={setOpen}
          isDeleteTaskDetail
        />
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
              to="/tasks"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton edge="start" color="inherit" aria-label="menu">
                <ArrowBackIos />
              </IconButton>
            </Link>

            <Box sx={{ flexGrow: 1 }} textAlign="center">
              <Typography variant="h6">Task details</Typography>
            </Box>
            <Link
              to="/tasks/update"
              search={data!}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="Filter">
                <Button color="inherit">
                  <EditNote color="disabled" />
                </Button>
              </Tooltip>
            </Link>
          </Toolbar>
        </AppBar>
        <Box
          flexGrow={1}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {/* Task Cards */}
          <Grid2 container spacing={2} sx={{ mt: 1, height: "100%" }}>
            {data != null ? (
              <Box textAlign="center" width="100%">
                <Typography
                  variant="h6"
                  component="h6"
                  marginBlock={1}
                  fontWeight={700}
                >
                  {data?.title}
                </Typography>
                <Grid xs={12} component="div" paddingInlineEnd={1} spacing={2}>
                  <Card
                    elevation={3}
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <List sx={style}>
                        <ListItem>
                          <ListItemText primary="Start" />
                          <Box marginLeft={20}>
                            <Chip color="primary" label="Jan 5, 2025"></Chip>
                            <Chip
                              color="primary"
                              label="July 24, 2025"
                              sx={{ marginLeft: 1 }}
                            ></Chip>
                          </Box>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemText primary="End" />
                          <Box marginLeft={20}>
                            <Chip color="primary" label="9:00 AM"></Chip>
                            <Chip
                              color="primary"
                              label="July 24, 2025"
                              sx={{ marginLeft: 1 }}
                            ></Chip>
                          </Box>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemText primary="Status" />
                          <Button
                            variant="contained"
                            size="small"
                            disabled={data?.status == "needsAction"}
                            color={
                              data?.status == "completed"
                                ? "success"
                                : "primary"
                            }
                            sx={{
                              color: "white",
                              marginRight: 2,
                              textTransform: "capitalize",
                            }}
                          >
                            {data?.status == "needsAction"
                              ? "Todo"
                              : data?.status == "completed"
                                ? "Completed"
                                : "Processing"}
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
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        component="h6"
                      >
                        Notification
                      </Typography>
                      <FormControlLabel
                        control={
                          <IOSSwitch sx={{ m: 1 }} defaultChecked disabled />
                        }
                        label=""
                      />
                    </Box>
                  </Card>
                  <Card
                    elevation={3}
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box
                      padding={2}
                      textAlign="left"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography variant="subtitle2" component="p">
                        {data?.notes}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <CircularProgress size={50} />
              </Box>
            )}
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
          onClick={() => {
            if (isPending) {
              return null;
            }
            setOpen(true);
            setTaskID(data?.id);
          }}
        >
          Delete Task
        </Box>
      </Box>
    </>
  );
}
