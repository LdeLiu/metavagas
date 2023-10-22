import { CommonError } from "../../../utils/commonError";
import { JobRepository } from "../repositories/repository";
import { TechnologyService } from "app/technology/services/service";
import { findJobsType, jobDataType, jobType } from "DTOs/jobTypes";
import { CityService } from "app/city/services/service";
import { SearchCountService } from "app/searchCounter/services/service";
import { counterDataType } from "DTOs/SearchCounterTypes";

class JobService{
    constructor(private repository: JobRepository, private technologyService: TechnologyService, private cityService: CityService, private searchCounterService: SearchCountService){}

    async create(data: jobType){
        const jobAreadyExists = await this.repository.findJob(data.company, data.jobPosition)
        if(jobAreadyExists){
            return CommonError.build('Job already exists')
        }
        const jobToPersist = {
            ...data,
            technologies: await this.technologyService.verify(data.technologies),
            city: await this.cityService.create(data.city)

        }
        return await this.repository.create(jobToPersist as unknown as jobDataType)
    }

    async findJobs(data: findJobsType){
        let queryToFind: Array<string> = []

        const technologies = await this.technologyService.findAllTechnologies()
        if("error" in technologies){
            return technologies
        }
        let cityId: any = await this.cityService.findCity(data.city)


        for(const query of data.queries){
            const nameTechFormated = query.toUpperCase().replace(' ','')
            let techId
            for(const tech of technologies){
                if(nameTechFormated === tech.name){
                    techId = tech.id
                    const dataCounter: counterDataType = {
                        technology: techId,
                        city: cityId._id
                    }
                    await this.searchCounterService.addCount(dataCounter)
                }
            }
            if(techId){
                queryToFind.push(techId)
            }
            else{
                queryToFind.push(query)
            }
        }

        const result = await this.repository.findJobs(queryToFind, cityId)
        return result
    }
}

export {JobService}
