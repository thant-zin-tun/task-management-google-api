import {
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
import { queryClient } from "../main";

interface DrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerCom: React.FC<DrawerProps> = ({ drawerOpen, setDrawerOpen }) => {
  const theme = useTheme();
  const { updateTasks, taskListID, taskLists } = useTaskHook();

  const handleTaskListsInvalidate = async (task_list_id: string) => {
    updateTasks(task_list_id);
    queryClient.invalidateQueries({ queryKey: ["tasks", task_list_id] });
    console.log("Query invalidated");
  };

  return (
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
      <List>
        {taskLists?.map(({ id, title }: { id: string; title: string }) => (
          <ListItem
            key={id}
            disablePadding
            component="li"
            onClick={() => {
              handleTaskListsInvalidate(id);
              setDrawerOpen(false);
            }}
            sx={{
              backgroundColor:
                id == taskListID ? theme.palette.primary.main : "",
              color: id == taskListID ? "#f8f8f8" : "",
            }}
          >
            <ListItemButton>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerCom;

//DrawerHeader
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
