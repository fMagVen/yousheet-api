import { Router } from "express";
import testRouter from "./e2eTestsRouter.js";
import userRouter from "./userRouter.js";
import dailiesRouter from "./dailiesRouter.js";
import todosRouter from "./todosRouter.js";
import diaryRouter from "./diaryRouter.js";
import skillsRouter from "./skillsRouter.js";
var router = Router();
router.use("/users", userRouter);
router.use("/dailies", dailiesRouter);
router.use("/todos", todosRouter);
router.use("/diary", diaryRouter);
router.use("/skills", skillsRouter);
if (process.env.NODE_ENV === "test")
    router.use("/e2e", testRouter);
export default router;
