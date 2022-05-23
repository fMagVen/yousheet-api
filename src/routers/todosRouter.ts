import { Router } from "express";
import * as todosController from "../controllers/todosController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validadeSchemaMiddleware.js";
import { upsertTodoSchema } from "../schemas/todoSchema.js";

const todosRouter = Router();

todosRouter.post(
  "/new",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(upsertTodoSchema),
  todosController.createTodo
);

todosRouter.get(
  "/all",
  ensureAuthenticatedMiddleware,
  todosController.getTodos
);

todosRouter.post(
  "/edit/:id",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(upsertTodoSchema),
  todosController.editTodo
);

todosRouter.post(
  "/delete/:id",
  ensureAuthenticatedMiddleware,
  todosController.deleteTodo
);

export default todosRouter;
