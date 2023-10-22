import * as yup from "yup";
import { CommonError } from "utils/commonError";
import { commonErrorType } from "DTOs/commonErrorType";
import { JobType } from "app/job/domain/job";

class JobSchemaValidation{
    static async bodyIsValid(data: JobType): Promise<commonErrorType>{
        const JobSchema = yup.object().shape({
            jobPosition: yup.string().required(),
            wage: yup.string().required(),
            city: yup.object().required(),
            jobWebsite: yup.string().required(),
            technologies: yup.array().required(),
            company: yup.string().required(),
            description: yup.string().required(),
            link: yup.string().required(),
        })

        try {
            await JobSchema.validate(data)
            return {error: false}
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }
}

class FindJobSchemaValidation{
    static async bodyIsValid(data: JobType): Promise<commonErrorType>{
        const findJobSchema = yup.object().shape({
            queries: yup.array().required(),
            city: yup.object().required(),
        })

        try {
            await findJobSchema.validate(data)
            return {error: false}
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }
}



export {JobSchemaValidation,FindJobSchemaValidation}