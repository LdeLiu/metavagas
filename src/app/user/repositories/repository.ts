
import { createType } from "DTOs/userTypes";
import { UserType } from "app/user/domain/user";
import { Model } from "mongoose";
import { CommonError } from "utils/commonError";

class UserRepository{
    constructor(private model: Model<UserType>){}

    create(data: UserType){
        try {
            return this.model.create(data);
        } catch (error: any) {
            return CommonError.build(error.message)
        }
    }

    findByEmail(email: string){
        try {
            return this.model.findOne({email})
        } catch (error: any) {
            return CommonError.build(error.message)
        }
    }

    update(id: string, data: createType){
        try {
            return this.model.findOneAndUpdate({_id: id}, data, {new: true})
        } catch (error:any) {
            return CommonError.build(error.message)
        }
    }

    setToFavorite(id:string, jobId:string){
        try {
            return this.model.findOneAndUpdate({_id: id},{$push: {favorites: jobId}})
        } catch (error:any) {
            return CommonError.build(error.message)
        }
    }
}

export {UserRepository}