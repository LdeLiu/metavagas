import { City } from "app/city/domain/city";
import { CityRepository} from "app/city/repositories/repository";
import { CityService } from "app/city/services/service";
import { JobController } from "app/job/controllers/controller";
import { Job } from "app/job/domain/job";
import { JobRepository } from "app/job/repositories/repository";
import { JobService } from "app/job/services/service";
import { SearchCount } from "app/searchCounter/domain/searchCount";
import { SearchCounterRepository } from "app/searchCounter/repositories/repository";
import { SearchCountService } from "app/searchCounter/services/service";
import { Technology } from "app/technology/domain/technology";
import { TechnologyRepository } from "app/technology/repositories/repository";
import { TechnologyService } from "app/technology/services/service";

class MakeJob{
    static getInstance(){
        const repository = new JobRepository(Job)
        const technologyRepository = new TechnologyRepository(Technology)
        const technologyService = new TechnologyService(technologyRepository)
        const cityRepository = new CityRepository(City)
        const cityService = new CityService(cityRepository)
        const searchConterRepository = new SearchCounterRepository(SearchCount)
        const searchCounterService = new SearchCountService(searchConterRepository)
        const service = new JobService(repository, technologyService, cityService, searchCounterService)
        const controller = new JobController(service)

        return controller
    }
}

export {MakeJob}
