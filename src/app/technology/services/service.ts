import { SearchCounterRepository } from "app/searchCounter/repositories/repository";
import { TechnologyRepository } from "../repositories/repository";
import { technologyType } from "DTOs/technologyTypes";

class TechnologyService{
    constructor(private repository: TechnologyRepository, private searchConterRepository: SearchCounterRepository){}

    async verify(technologies: String[]){
        const technologiesToPersist: Array<String> = []
        
        for await(const tech of technologies){
            const nameTechFormated = tech.toUpperCase().replace(' ','')
            const technologyExists = await this.repository.find(nameTechFormated)
            if(!technologyExists){
                const newTechnology = await this.repository.create(nameTechFormated)
                technologiesToPersist.push((newTechnology as unknown as technologyType)._id) 
            }
            else{
                technologiesToPersist.push((technologyExists as unknown as technologyType)._id)
            }
        }

        return technologiesToPersist
    }

    async findAllTechnologies(){
        const technologies = await this.repository.findAll()
        return technologies
    }

    async getTopTechnologies(){
        const result = await this.searchConterRepository.getTopTechnologys()
        return result
    }
}

export {TechnologyService}
