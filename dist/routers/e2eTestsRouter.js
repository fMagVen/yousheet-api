import { Router } from "express";
import * as e2eTestsController from "../controllers/e2eTestsController.js";
var testRouter = Router();
testRouter.post("/users/truncate", e2eTestsController.testTruncateTableUsers);
testRouter.post("/users/seed", e2eTestsController.testSeedTableUsers);
export default testRouter;
