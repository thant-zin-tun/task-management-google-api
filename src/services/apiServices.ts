import { Task, TaskListsArr } from "../types/tast-types";
import axiosInstance from "./axios";

//Fetch All Task Lists
export const fetchTaskListsFunc = async (): Promise<TaskListsArr> => {
  const response = await axiosInstance.get("/users/@me/lists");
  console.log(response.data.items || []);
  return response.data.items || [];
};

//Fetch all tasks buy ID
export const fetchTasksByTaskListIDFunc = async (
  taskListID: string
): Promise<Task[]> => {
  const response = await axiosInstance.get(
    `lists/${taskListID}/tasks?showCompleted=true&showHidden=true`
  );
  return response.data.items || [];
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

//Create Tasks by TaskID
export const updateTasksDetailByID = async (
  tasklist_id: string,
  task_id: string,
  title: string,
  notes: string,
  status: string
) => {
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
};

// HoloId : TGNmcDNnNklJSHZPRDV3TQ
