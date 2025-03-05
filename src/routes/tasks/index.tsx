import {
  createFileRoute,
  redirect,
  Outlet,
  useRouter,
} from "@tanstack/react-router";

import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Divider,
  CircularProgress,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Logout, SearchOutlined } from "@mui/icons-material";

import CreateTaskDialog from "../../components/DialogBox";
import { useEffect, useMemo, useState } from "react";
import { checkToken } from "../../services/check_token";
import DrawerCom from "../../components/DrawerCom";
import TaskCard from "../../components/card/TaskCard";
import { useTaskHook } from "../../hooks/useTaskHook";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchTaskListsFunc,
  fetchTasksByTaskListIDFunc,
} from "../../services/apiServices";
import { TaskList, TasksArr } from "../../types/tast-types";

import { useInView } from "react-intersection-observer";
import { cookies } from "../../services/axios";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";

import { ToastContainer } from "react-toastify";

export const Route = createFileRoute("/tasks/")({
  notFoundComponent: () => <h1>Task Not Found</h1>,
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { taskListID, setTaskListID } = useTaskHook();

  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data: taskLists } = useQuery<TaskList[]>({
    queryKey: ["taskLists"],
    queryFn: fetchTaskListsFunc,
  });
  const {
    data: tasks,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<TasksArr>({
    queryKey: ["tasks", taskListID],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => {
      return fetchTasksByTaskListIDFunc(taskListID!, {
        pageParamNextPageToken: pageParam as string,
      });
    },
    enabled: !!taskListID,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken;
    },
  });

  const chooseTaskListID = useMemo(() => {
    if (!taskLists) return undefined;
    let newTaskLists = taskLists.filter((list) => list.id == taskListID);
    return newTaskLists[0]?.title;
  }, [taskLists, taskListID]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleTaskListID = () => {
    let taskListIDFromStorage = getSessionStorage("task_list_id");
    if (taskListIDFromStorage) {
      setTaskListID(taskListIDFromStorage);
    } else {
      if (taskLists && taskLists.length > 0) {
        setTaskListID(taskLists[0].id);
        setSessionStorage("task_list_id", taskLists[0].id);
      }
    }
  };

  useEffect(() => {
    handleTaskListID();
  }, [taskLists]);

  return (
    <>
      <ToastContainer />

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
        <CreateTaskDialog
          open={open}
          setOpen={setOpen}
          taskLists={taskLists!}
          isTaskCreate="tasks"
        />

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
            <Tooltip title="Search">
              <Button color="inherit">
                <SearchOutlined color="disabled" />
              </Button>
            </Tooltip>
            <Tooltip title="Logout">
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  cookies.remove("ACT");
                  router.navigate({
                    to: "/",
                  });
                }}
              >
                <Logout />
              </Button>
            </Tooltip>
          </Toolbar>
          <DrawerCom
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            taskLists={taskLists!}
            taskListID={taskListID!}
          />
        </AppBar>

        <Box
          flexGrow={1}
          display="flex"
          flexDirection={"column"}
          alignItems="start"
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <TaskCard
            tasks={tasks?.pages.flatMap((page) => page.tasks)}
            isPending={isPending}
            isError={isError}
          />
          {hasNextPage ? (
            <Box
              display="flex"
              justifyContent="center"
              ref={ref}
              height={60}
              width={"100%"}
              paddingBlock={1}
            >
              <CircularProgress size={40} />
            </Box>
          ) : null}
        </Box>

        <Divider />

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
      <Outlet />
    </>
  );
};
