import { Router } from "express";
import { MakeTechnology } from "facturies/makeTechnology";

const technologyRouter = Router()
const controller = MakeTechnology.getInstance()

technologyRouter.get('/technology', controller.getTopTechnologies.bind(controller))

export {technologyRouter}
