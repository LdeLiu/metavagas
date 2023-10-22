import { Router } from "express";
import { MakeUser } from "facturies/makeUser";
import { AuthMiddleware } from "middleware/authMiddleware";

const userRouter = Router()
const controller = MakeUser.getInstance()

userRouter.post('/users', controller.create.bind(controller))
userRouter.post('/users/singin', controller.singIn.bind(controller))
userRouter.patch('/users/update', AuthMiddleware.handle , controller.update.bind(controller))
userRouter.patch('/users/favorite', AuthMiddleware.handle , controller.favorite.bind(controller))

export {userRouter}
