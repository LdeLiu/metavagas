import { Model } from "mongoose";
import { CityType } from "../domain/city";
import { CommonError } from "utils/commonError";

class CityRepository{
    constructor(private model: Model<CityType>){}

    create(data: CityType){
        try {
            return this.model.create(data)
        } catch (error: any) {
            return CommonError.build(error.errors)
        }
    }

    findCity(data: CityType){
        let query = []
        if(data.name){
            if(data.UF){
                query.push({name:{ $regex: new RegExp(data.name, 'i')}},{UF:data.UF})
            }
            else{query.push({name:{ $regex: new RegExp(data.name, 'i')}})}
        }
        else{
            return
        }
        
        try {
            return this.model.findOne({$and: query})
        } catch (error: any) {
            return CommonError.build(error.errors)
        }

    }
}

export {CityRepository}