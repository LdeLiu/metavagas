import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import { CommonError } from "../../../utils/commonError";
import { UserRepository } from "../repositories/repository";
import { Crypt } from "../../../utils/crypt";
import { SignInType, createType, userType } from "DTOs/userTypes";

class UserService{
    constructor(private repository: UserRepository){}

    async create(data: createType){
        const userAreadyExists = await this.repository.findByEmail(data.email)
        if(userAreadyExists){
            return CommonError.build('User already exists')
        }

        const userToPersist = {
            ...data,
            password: bcrypt.hashSync(data.password, 8)
        }

        const result = this.repository.create(userToPersist as userType)
        return result
    }

    async singIn(data: SignInType){
        const userAreadyExists = await this.repository.findByEmail(data.email)
        if(!userAreadyExists){
            return CommonError.build('Invalid credentials')
        }
        const passworIsValid = Crypt.compare(data.password, (userAreadyExists as unknown as userType).password)
        if(!passworIsValid){
            return CommonError.build('invalid credentials')
        }

        const payload = {...userAreadyExists}
        const secretKey = process.env.SECRET_KEY as string
        const options = {expiresIn: '15m'}

        const token = JWT.sign(payload, secretKey, options)
        return token
    }

    async update(id: string, data: createType){
        const userToPersist = {
            ...data,
            password: bcrypt.hashSync(data.password, 8)
        }

        const result = await this.repository.update(id, userToPersist)
        return result 
    }

    async setToFavorite(id: string, jobId: { id: string}){
        const idToPersist = jobId.id
        const result = await this.repository.setToFavorite(id, idToPersist)
        return result
    }
}

export {UserService}