import express from "express";
import { userController } from "../controllers/user.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import uploadLocal from "../common/multer/local.multer.js";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);
userRouter.post(
  `/avatar-local`,
  protect,
  uploadLocal.single("avatar"),
  userController.uploadLocal
);
export default userRouter;
