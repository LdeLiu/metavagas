import {Request , Response} from 'express'
import { UserSchemaValidation } from 'utils/validations/userSchema'
import { UserService } from '../services/service'
import { DecodeJWT } from 'utils/decodeJWT'

class UserController {
    constructor(private service: UserService){}

    async create(req: Request, res: Response){
        const { body } = req
        const bodyIsValid = await UserSchemaValidation.bodyIsValid(body)
        if(bodyIsValid.error === true){
            return res.status(400).json(bodyIsValid.message)
        }
        const result = await this.service.create(body)
        return "error" in result ? res.status(400).json(result.message) : res.status(201).json('Created successfully')
    }

    async singIn(req: Request, res: Response){
        const { body } = req
        const loginIsValid = await UserSchemaValidation.loginIsvalid(body)
        if(loginIsValid.error === true){
            return res.status(400).json(loginIsValid.message)
        }
        const result = await this.service.singIn(body)
        if(typeof(result) === "string"){
            return res.status(201).json(result)
        }
        return res.status(400).json(result.message)
    }

    async update(req: Request, res: Response){
        const { body } = req
        const token = req.headers.authorization
        if(!token){
            return res.status(400).json('params missing')
        }
        const idUser = DecodeJWT.Payload(token)._id
        const bodyIsValid = await UserSchemaValidation.bodyIsValid(body)
        if(bodyIsValid.error === true){
            return res.status(400).json(bodyIsValid.message)
        }
        const result = await this.service.update(idUser,body)
        return "error" in result ? res.status(400).json(result.message) : res.status(201).json('Updated successfully')
    }

    async favorite(req: Request, res: Response){
        const { body } = req
        const token = req.headers.authorization
        if(!token){
            return res.status(400).json('params missing')
        }
        const idUser = DecodeJWT.Payload(token)._id
        const idIsValid = await UserSchemaValidation.idIsValid(body)
        if(idIsValid.error === true){
            return res.status(400).json(idIsValid.message)
        }
        const result = await this.service.setToFavorite(idUser,body)
        return "error" in result ? res.status(400).json(result.message) : res.status(201).json('Job save in favorite successfully')
    }


}

export {UserController}