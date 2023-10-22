import {Request , Response} from 'express'
import { TechnologyService } from "../services/service";

class TechnologyController{
    constructor(private service: TechnologyService){}

    async getTopTechnologies(req: Request, res: Response){
        const result = await this.service.getTopTechnologies()
        return "error" in result ? res.status(400).json(result.message) : res.status(201).json(result)
    }
}

export {TechnologyController}