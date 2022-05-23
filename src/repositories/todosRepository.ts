import { prisma } from "../database.js";
import { createTodoData, TodoData } from "../services/todosService.js";

export async function createTodo(data: createTodoData) {
  await prisma.todos.create({ data });
}

export async function getTodos(id: number) {
  return await prisma.todos.findMany({ where: { userId: id } });
}

export async function editTodo(todoId: number, data: TodoData) {
  await prisma.todos.update({ where: { id: todoId }, data });
}

export async function deleteTodo(todoId: number) {
  await prisma.todos.delete({ where: { id: todoId } });
}
