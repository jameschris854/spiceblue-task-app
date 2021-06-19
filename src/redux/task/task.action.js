import taskActionTypes from "./task.types";

export const setAllTasks = (tasks) => ({
  type: taskActionTypes.SET_TASKS_DATA,
  payload: tasks
});
