import { Model } from "mongoose";
import { TechnologyType } from "../domain/technology";
import { CommonError } from "utils/commonError";

class TechnologyRepository{
    constructor(private model: Model<TechnologyType>){}

    create(data: string){
        try {
            return this.model.create({name: data})
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    find(technology: string){
        try {
            return this.model.findOne({name: technology})
        } catch (error: any) {
            return CommonError.build(error.errors) 
        }
    }
    findAll(){
        try {
            return this.model.find().select('name')
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

}

export {TechnologyRepository}