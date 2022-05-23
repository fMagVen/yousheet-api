import { Router } from "express";
import * as skillsController from "../controllers/skillsController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validadeSchemaMiddleware.js";
import { skillSchema } from "../schemas/skillSchema.js";

const skillsRouter = Router();

skillsRouter.post(
  "/new",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(skillSchema),
  skillsController.createSkill
);

skillsRouter.get(
  "/all",
  ensureAuthenticatedMiddleware,
  skillsController.getSkills
);

skillsRouter.post(
  "/edit/:id",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(skillSchema),
  skillsController.editSkill
);

skillsRouter.post(
  "/delete/:id",
  ensureAuthenticatedMiddleware,
  skillsController.deleteSkill
);

export default skillsRouter;
