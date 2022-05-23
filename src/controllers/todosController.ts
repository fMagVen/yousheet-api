import { Request, Response } from "express";
import * as todosService from "../services/todosService.js";

export async function createTodo(req: Request, res: Response) {
  const user = res.locals.user;
  const data: todosService.createTodoData = {
    userId: user.id,
  };
  fillTodoForm(data, req.body.name, req.body.priority, req.body.dateDue);
  await todosService.createTodo(data);
  res.sendStatus(201);
}

export async function getTodos(_: Request, res: Response) {
  const user = res.locals.user;
  const todos = await todosService.getTodos(user.id);
  res.status(200).send(todos);
}

export async function editTodo(req: Request, res: Response) {
  const todoId = parseInt(req.params.id);
  const data: todosService.TodoData = {};
  fillTodoForm(data, req.body.name, req.body.priority, req.body.dateDue);
  await todosService.editTodo(todoId, data);
}

function fillTodoForm(
  data: todosService.TodoData | todosService.createTodoData,
  name: string | undefined,
  priority: number | undefined,
  dateDue: Date | undefined
) {
  if (name) data.name = name;
  if (priority) data.priority = priority;
  if (dateDue) data.dateDue = dateDue;
}

export async function deleteTodo(req: Request, res: Response) {
  const todoId = parseInt(req.params.id);
  await todosService.deleteTodo(todoId);
}
