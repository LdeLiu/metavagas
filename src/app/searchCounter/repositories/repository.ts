import { Model, ObjectId } from "mongoose";
import { searchCountType } from "../domain/searchCount";
import { counterPersistType } from "DTOs/SearchCounterTypes";
import { CommonError } from "utils/commonError";

class SearchCounterRepository{
    constructor(private model: Model<searchCountType>){}

    create(data: counterPersistType){
        try {
            return this.model.create(data)
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    findTechCount(data: string){
        try {
            return this.model.findOne({technology: data})
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    addCount(id: ObjectId, data: counterPersistType){
        try {
            return this.model.findOneAndUpdate({_id: id},data)
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }
    getTopTechnologys(){
        try {
            return this.model.find().sort({count: -1}).limit(5).populate([{path:'technology'}, {path: "cities", populate: {path: "city"}, options: {sort: { count: -1}, limit: 5}}])
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }
}

export {SearchCounterRepository}