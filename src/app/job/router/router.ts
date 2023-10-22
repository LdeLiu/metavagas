import { Router } from "express";
import { MakeJob } from "facturies/mokeJob";
import { AuthMiddleware } from "middleware/authMiddleware";

const jobRouter = Router()
const controller = MakeJob.getInstance()

jobRouter.post('/jobs', AuthMiddleware.handle , controller.create.bind(controller))
jobRouter.post('/jobs/find',controller.findJobs.bind(controller))

export {jobRouter}


