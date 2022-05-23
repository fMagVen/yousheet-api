import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validadeSchemaMiddleware.js";
import { logUserSchema, upsertUserSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post(
  "/create",
  validateSchemaMiddleware(upsertUserSchema),
  userController.createUser
);
userRouter.post(
  "/log",
  validateSchemaMiddleware(logUserSchema),
  userController.logUser
);
userRouter.post(
  "/update",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(upsertUserSchema),
  userController.updateUser
);
userRouter.post(
  "/delete",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(upsertUserSchema),
  userController.deleteUser
);

export default userRouter;
