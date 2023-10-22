import { Model, Types } from "mongoose";
import { JobType, Job } from "../domain/job";
import { CommonError } from "utils/commonError";
import { jobDataType } from "DTOs/jobTypes";
import { cityDataType } from "DTOs/cityTypes";

class JobRepository{
    constructor(private model: Model<JobType>){}
    
    create(data: jobDataType){
        try {
            return this.model.create(data)
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    findJob(company: string, jobPosition: string){
        try {
            return this.model.findOne({$and: [{company}, {jobPosition}]})
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    findJobs(queries: Array<string>, city: cityDataType | {}){

        const expressionQuery = queries.map(text => {
            let query: Array<{}> = []

            Object.keys(Job.schema.obj).map(key => {
                if(key === "city"){
                    return
                }
                if(Types.ObjectId.isValid(text)){
                    if(key === "technologies"){
                        query.push({[key]: {$in: text}})
                    }
                    else{
                        return
                    }
                }
                else{
                    if(key === "technologies"){
                        return
                    }
                    else{
                        query.push({[key]:{ $regex: new RegExp(text, 'i')}})
                    }
                }
            })
            return({$or: query})
        })

        if(queries.length > 0 && Object.keys(city).length > 0) {
            try {
                return this.model.find({$and : expressionQuery.flat(), city: city}).populate({path:'technologies', select: 'name'})
            } catch (error: any) {
                return CommonError.build(error.errors)
            }
        }
        if(queries.length <= 0 && Object.keys(city).length <= 0){
            try {
                return this.model.find().populate({path:'technologies', select: 'name'})
            } catch (error: any) {
                return CommonError.build(error.errors)
            }
        }
        if(queries.length > 0){
            try {
                return this.model.find({$or : expressionQuery.flat()}).populate({path:'technologies', select: 'name'})
            } catch (error: any) {
                return CommonError.build(error.errors)
            }
        }
        
        try {
            return this.model.find({city: city}).populate({path:'technologies', select: 'name'})
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
        


    }
}

export {JobRepository}
