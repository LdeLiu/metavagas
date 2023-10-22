import * as yup from "yup";
import { CommonError } from "utils/commonError";
import { UserType } from "app/user/domain/user";
import { commonErrorType } from "DTOs/commonErrorType";

class UserSchemaValidation{
    static async bodyIsValid(data: UserType): Promise<commonErrorType>{
        const UserSchema = yup.object().shape({
            name: yup.string().required(),
            password: yup.string().required(),
            email: yup.string().required().email()
        })

        try {
            await UserSchema.validate(data)
            return {error: false}
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    static async loginIsvalid(data: UserType): Promise<commonErrorType> {
        const LoginSchema = yup.object().shape({
            password: yup.string().required(),
            email: yup.string().required().email()
        })

        try {
            await LoginSchema.validate(data)
            return {error: false}
        } catch (error: any) {
            return CommonError.build(error.errors)
        }  
    }

    static async idIsValid(data: UserType): Promise<commonErrorType>{
        const UserSchema = yup.object().shape({
            id: yup.string().required()
        })

        try {
            await UserSchema.validate(data)
            return {error: false}
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }
}

export {UserSchemaValidation}