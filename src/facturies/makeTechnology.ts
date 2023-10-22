import { SearchCount } from "app/searchCounter/domain/searchCount";
import { SearchCounterRepository } from "app/searchCounter/repositories/repository";
import { TechnologyController } from "app/technology/controllers/controller";
import { Technology } from "app/technology/domain/technology";
import { TechnologyRepository } from "app/technology/repositories/repository";
import { TechnologyService } from "app/technology/services/service";

class MakeTechnology{
    static getInstance(){
        const repository = new TechnologyRepository(Technology)
        const searchCountRepository = new SearchCounterRepository(SearchCount)
        const service = new TechnologyService(repository, searchCountRepository)
        const controller = new TechnologyController(service)

        return controller
    }
}

export {MakeTechnology}
