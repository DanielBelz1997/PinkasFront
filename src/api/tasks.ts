import axios from "axios";
import { Task } from "../types/item";

export const getAllTasks = async (param: boolean) => {
  const response = await axios.get(import.meta.env.VITE_API_URL, {
    params: param ? { param } : {},
  });
  return response.data as Task[];
};

export const getTask = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks/${id}`
  );
  return response.data as Task;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(import.meta.env.VITE_API_URL, task);
  return response.data as Task;
};

export const updateTask = async ({
  id,
  task,
}: {
  id: number;
  task: Task;
}): Promise<Task> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/${id}`,
    task
  );

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);

  return response.data as Task;
};
