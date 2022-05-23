import { Router } from "express";
import * as dailiesController from "../controllers/dailiesController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validadeSchemaMiddleware.js";
import {
  createDailySchema,
  createChecklistSchema,
} from "../schemas/dailySchema.js";

const dailiesRouter = Router();

dailiesRouter.post(
  "/new/daily",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createDailySchema),
  dailiesController.createDaily
);

dailiesRouter.post(
  "/new/checklist",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(createChecklistSchema),
  dailiesController.createDaily
);

dailiesRouter.get(
  "/get/all",
  ensureAuthenticatedMiddleware,
  dailiesController.getDailies
);

dailiesRouter.post(
  "/edit/daily/:id",
  ensureAuthenticatedMiddleware,
  dailiesController.editDaily
);

dailiesRouter.post(
  "/edit/checklist/:id",
  ensureAuthenticatedMiddleware,
  dailiesController.editChecklist
);

dailiesRouter.post(
  "/delete/daily/:id",
  ensureAuthenticatedMiddleware,
  dailiesController.deleteDaily
);

dailiesRouter.post(
  "/delete/checklist/:id",
  ensureAuthenticatedMiddleware,
  dailiesController.deleteChecklist
);
export default dailiesRouter;
