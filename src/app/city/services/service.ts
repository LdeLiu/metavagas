
import { CityType } from "../domain/city";
import { CityRepository } from "../repositories/repository";

class CityService{
    constructor(private repository: CityRepository){}

    async create(data: CityType){
        const result = await this.repository.create(data)
        if("error" in result){
            return result
        }
        return result._id
    }

    async findCity(data: CityType){

        const result = await this.repository.findCity(data)
        if(result){
            return result
        }
        return {}
    }
}

export {CityService}