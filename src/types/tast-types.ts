export type Task = {
  id: string;
  title: string;
  updated: string;
  selfLink: string;
  notes: "I need to do laundry.";
  status: "needsAction" | "completed";
  due: string;
};

export type TaskList = {
  id: string;
  title: string;
  update: string;
  selfLink: string;
};

export type TaskListsArr = TaskList[];

export type TasksArr = {
  tasks: Task[];
  nextPageToken: string | null | undefined;
};
