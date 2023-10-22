import { jobRouter } from "app/job/router/router";
import { technologyRouter } from "app/technology/router/technologyRouter";
import { userRouter } from "app/user/router/userRouter";
import { Router } from "express";


const Routers = Router()

Routers.use(userRouter)
Routers.use(jobRouter)
Routers.use(technologyRouter)

export {Routers}