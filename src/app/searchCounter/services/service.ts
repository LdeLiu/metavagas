import { counterPersistType, counterDataType, cityType } from "DTOs/SearchCounterTypes";
import { SearchCounterRepository } from "../repositories/repository";
import { ObjectId } from "mongoose";

class SearchCountService{
    constructor(private repository: SearchCounterRepository){}

    async addCount(data: counterDataType){

        const countAreadyExists = await this.repository.findTechCount(data.technology)
        if(countAreadyExists){
            if("error" in countAreadyExists){
                return countAreadyExists
            }
            let dataToPersist = {
                ...countAreadyExists,
                count: countAreadyExists.count++,
                cities: countAreadyExists.cities
            }

            if(data.city){
                let cityAreadyExists
                dataToPersist.cities.forEach(current  => {
                    if((current.city as unknown as ObjectId).toString() === (data.city.toString())){
                        current.count = current.count +1
                        return cityAreadyExists = true
                    }
                })
    
                if(!cityAreadyExists){
                    const cityToPersist = {city: data.city, count: 1 }
                    dataToPersist.cities.push(cityToPersist as any)
                }
            }

             
            return await this.repository.addCount((countAreadyExists._id as unknown as ObjectId),(dataToPersist as unknown as counterPersistType))
        }
        const dataToPersist: counterPersistType = {
            technology: data.technology,
            cities: {}
        }
        if(data.city){
            const cityToPersist = {city: data.city, count: 1 }
            dataToPersist.cities = cityToPersist
        }
        return await this.repository.create(dataToPersist) 
    }
}

export {SearchCountService}