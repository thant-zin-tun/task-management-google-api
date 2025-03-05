import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useTaskHook } from "../hooks/useTaskHook";
import { TaskListsArr } from "../types/tast-types";
import CreateTaskDialog from "./DialogBox";

import DeleteIcon from "@mui/icons-material/Delete";
import { Add, EditNote } from "@mui/icons-material";
import DeleteDialogBox from "./DeleteDialogBox";

interface DrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskLists: TaskListsArr;
  taskListID: string;
}

const DrawerCom: React.FC<DrawerProps> = ({
  drawerOpen,
  setDrawerOpen,
  taskLists,
  taskListID,
}) => {
  const theme = useTheme();
  const { updateTasks } = useTaskHook();

  const [open, setOpen] = React.useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);

  const [createOrupdate, setCreateOrUpdate] = React.useState<string>("tasks");
  const [value, setValue] = React.useState<string>("");

  const [chooseTaskListID, setChooseListID] = React.useState<string | null>(
    null
  );

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={700}>Task Lists</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Box height={"90vh"} overflow="auto">
          <List>
            {taskLists?.map(({ id, title }: { id: string; title: string }) => (
              <ListItem
                key={id}
                disablePadding
                component="li"
                onClick={() => {
                  updateTasks(id);
                  setDrawerOpen(false);
                }}
                sx={{
                  backgroundColor:
                    id == taskListID ? theme.palette.primary.main : "",
                  color: id == taskListID ? "#f8f8f8" : "",
                }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label="delete"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChooseListID(id!);
                        setDeleteOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label="delete"
                      color="info"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCreateOrUpdate("updateTasklists");
                        setValue(title);
                        setOpen(true);
                        setChooseListID(id!);
                      }}
                    >
                      <EditNote />
                    </IconButton>
                  </>
                }
              >
                <ListItemButton>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />
        <Box width="100%" padding={2}>
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setCreateOrUpdate("tasklists");
              setOpen(true);
            }}
          >
            Create
          </Button>
        </Box>
      </Drawer>
      <CreateTaskDialog
        isTaskCreate={createOrupdate}
        open={open}
        setOpen={setOpen}
        taskID={chooseTaskListID!}
        updateValue={value!}
      />
      <DeleteDialogBox
        identifier={chooseTaskListID!}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        isDeleteTaskDetail={false}
      />
    </>
  );
};

export default DrawerCom;

//DrawerHeader
const drawerWidth = 300;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
