import { Request, Response } from "express";
import { JobService } from "../services/service";
import { FindJobSchemaValidation, JobSchemaValidation } from "utils/validations/jobSchema";

class JobController{
    constructor(private service: JobService){}

    async create(req: Request, res: Response){
        const { body } = req
        const bodyIsValid = await JobSchemaValidation.bodyIsValid(body)
        if(bodyIsValid.error === true){
            return res.status(400).json(bodyIsValid.message)
        }
        const result = await this.service.create(body)

        return "error" in result ? res.status(400).json(result.message) : res.status(201).json(result)
    }

    async findJobs(req: Request, res: Response){
        const {body} = req
        const bodyIsValid = await FindJobSchemaValidation.bodyIsValid(body)
        if(bodyIsValid.error === true){
            return res.status(400).json(bodyIsValid.message)
        }
        const result = await this.service.findJobs(body)

        return "error" in result ? res.status(400).json(result.message) : res.status(201).json(result)
    }
}

export {JobController}