import { Task, TaskListsArr, TasksArr } from "../types/tast-types";
import axiosInstance from "./axios";

//Fetch All Task Lists
export const fetchTaskListsFunc = async (): Promise<TaskListsArr> => {
  const response = await axiosInstance.get("/users/@me/lists");
  return response.data.items || [];
};

// Fetch all tasks by ID
export const fetchTasksByTaskListIDFunc = async (
  taskListID: string,
  { pageParamNextPageToken }: { pageParamNextPageToken: string }
): Promise<TasksArr> => {
  let url = `lists/${taskListID}/tasks?showCompleted=true&showHidden=true&maxResults=10`;
  if (pageParamNextPageToken) {
    url += `&pageToken=${pageParamNextPageToken}`;
  }
  const response = await axiosInstance.get(url);
  return {
    tasks: response.data.items,
    nextPageToken: response.data.nextPageToken,
  };
};

//Detete Tasks by TaskID
export const deleteTasksDetailByID = async (
  tasklist_id: string,
  task_id: string
) => {
  const response = await axiosInstance.delete(
    `/lists/${tasklist_id}/tasks/${task_id}`
  );
  if (response.status == 204) {
    return "success";
  }
  return "Something wend wrong!";
};

// /lists/{tasklist}/tasks/{task} => TaskDetail By ID
export const fetchTasksDetailByID = async (
  tasklist_id: string,
  task_id: string
): Promise<Task> => {
  const response = await axiosInstance.get(
    `/lists/${tasklist_id}/tasks/${task_id}`
  );
  return response.data;
};

//Create Tasks by TaskID
export const createTasksDetailByID = async (
  tasklist_id: string,
  title: string,
  notes: string,
  status: string
) => {
  const response = await axiosInstance.post(`lists/${tasklist_id}/tasks`, {
    title,
    notes,
    status,
  });
  if (response.status == 200) {
    return "success";
  }
  return "Something wend wrong!";
};

//Update Tasks by TaskID
export const updateTasksDetailByID = async (
  tasklist_id: string,
  task_id: string,
  title: string,
  notes: string,
  status: string
) => {
  try {
    const response = await axiosInstance.patch(
      `lists/${tasklist_id}/tasks/${task_id}`,
      {
        title,
        notes,
        status,
      }
    );
    if (response.status == 200) {
      return "success";
    }
    return "Something wend wrong!";
  } catch (error) {
    console.error("Error deleting task list:", error);
    return `Failed to delete task list: ${error}`;
  }
};

//Create Task List
export const createTaskList = async (tasklist_name: string) => {
  try {
    const response = await axiosInstance.post("/users/@me/lists", {
      title: tasklist_name,
    });
    if (response.status == 200) {
      return "success";
    }
    return "Something wend wrong!";
  } catch (error) {
    console.error("Error deleting task list:", error);
    return `Failed to delete task list: ${error}`;
  }
};

//Delete Task List
export const deleteTaskList = async (tasklist_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/users/@me/lists/${tasklist_id}`
    );
    if (response.status === 204) {
      return "success";
    }
    return "Something went wrong!";
  } catch (error) {
    console.error("Error deleting task list:", error);
    return `Failed to delete task list: ${error}`;
  }
};

//Update Task List
export const updateTaskList = async (
  tasklist_title: string,
  tasklist_id: string
) => {
  try {
    const response = await axiosInstance.patch(
      `/users/@me/lists/${tasklist_id}`,
      {
        title: tasklist_title,
      }
    );
    if (response.status === 204) {
      return "success";
    }
    return "Something went wrong!";
  } catch (error) {
    console.error("Error deleting task list:", error);
    return `Failed to delete task list: ${error}`;
  }
};
