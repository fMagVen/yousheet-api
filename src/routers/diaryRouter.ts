import { Router } from "express";
import * as diaryController from "../controllers/diaryController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validadeSchemaMiddleware.js";
import { diaryEntrySchema } from "../schemas/diarySchema.js";

const diaryRouter = Router();

diaryRouter.post(
  "/new",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(diaryEntrySchema),
  diaryController.createDiaryEntry
);

diaryRouter.get(
  "/all",
  ensureAuthenticatedMiddleware,
  diaryController.getUserDiary
);

diaryRouter.post(
  "/edit/:id",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(diaryEntrySchema),
  diaryController.editDiaryEntry
);

diaryRouter.post(
  "/delete/text/:id",
  ensureAuthenticatedMiddleware,
  diaryController.deleteTextOnly
);

diaryRouter.post(
  "/delete/whole/:id",
  ensureAuthenticatedMiddleware,
  diaryController.deleteWholeEntry
);

export default diaryRouter;
