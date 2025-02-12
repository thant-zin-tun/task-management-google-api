import { createFileRoute, redirect } from "@tanstack/react-router";

import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Grid2,
  CircularProgress,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Filter1Sharp, SearchOutlined } from "@mui/icons-material";

import CreateTaskDialog from "../../components/DialogBox";
import { useMemo, useState } from "react";
import { checkToken } from "../../services/check_token";

import DrawerCom from "../../components/DrawerCom";

import TaskCard from "../../components/card/TaskCard";
import { useTaskHook } from "../../hooks/useTaskHook";

export const Route = createFileRoute("/tasks/")({
  component: () => <HomeScreen />,
  beforeLoad: () => {
    const token = checkToken();
    if (token == undefined) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

const HomeScreen = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { taskListID, taskLists, tasks } = useTaskHook();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const chooseTaskListID = useMemo(() => {
    if (!taskLists) return undefined;
    let newTaskLists = taskLists.filter((list) => list.id == taskListID);
    return newTaskLists[0]?.title;
  }, [taskLists, taskListID]);

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
        <CreateTaskDialog open={open} setOpen={setOpen} isCreate />
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} textAlign="center">
              <Typography variant="h6">{chooseTaskListID}</Typography>
            </Box>
            <Tooltip title="Filter">
              <Button color="inherit">
                <Filter1Sharp color="disabled" />
              </Button>
            </Tooltip>
            <Tooltip title="Filter">
              <Button color="inherit">
                <SearchOutlined color="disabled" />
              </Button>
            </Tooltip>
          </Toolbar>
          <DrawerCom drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </AppBar>

        <Box
          flexGrow={1}
          display="flex"
          alignItems="start"
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {tasks.length == 0 ? (
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
          ) : (
            <Grid2
              container
              spacing={2}
              sx={{ mt: 1, width: "100%" }}
              display="flex"
              justifyContent={"start"}
              alignItems={"start"}
            >
              <TaskCard />
            </Grid2>
          )}
        </Box>

        <Divider />

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
          onClick={() => setOpen(true)}
        >
          New Task
        </Box>
      </Box>
    </>
  );
};
