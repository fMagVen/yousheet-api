import * as todosRepository from "../repositories/todosRepository.js";

export interface TodoData {
  name?: string;
  priority?: number;
  dateDue?: Date;
}

export interface createTodoData extends TodoData {
  userId: number;
}

export async function createTodo(data: createTodoData) {
  return await todosRepository.createTodo(data);
}

export async function getTodos(id: number) {
  return await todosRepository.getTodos(id);
}

export async function editTodo(todoId: number, data: TodoData) {
  await todosRepository.editTodo(todoId, data);
}

export async function deleteTodo(todoId: number) {
  await todosRepository.deleteTodo(todoId);
}
