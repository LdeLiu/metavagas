import {vi, describe, it, expect} from 'vitest'
import { JobRepository } from "../repositories/repository";
import { TechnologyService } from 'app/technology/services/service';
import { CityService } from 'app/city/services/service';
import { SearchCountService } from 'app/searchCounter/services/service';
import { JobService } from './service';


const repositoryMock = {
    findJob: vi.fn(),
    findJobs: vi.fn(),
    create: vi.fn()
} as any as JobRepository

const technologyServiceMock ={
    verify: vi.fn(),
    findAllTechnologies: vi.fn()
} as any as TechnologyService

const cityServiceMock = {
    create: vi.fn(),
    findCity: vi.fn()
}as any as CityService

const SearchCounterServiceMock = {
    addCount: vi.fn()
}as any as SearchCountService


const sut = new JobService(repositoryMock, technologyServiceMock, cityServiceMock, SearchCounterServiceMock)

describe('JobService', () => {
    describe('create', () =>{
        it('should return a object error if job already exists', async () =>{
            const dataMock = {}
            const expectedResult = {error: true, message: 'Job already exists'}

            vi.spyOn(repositoryMock, 'findJob').mockResolvedValue(true as any)

            const result = await sut.create(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })

        it('should create and return object of job if not exists', async () =>{
            const dataMock = {}
            const expectedResult = {technologies: [], jobPosition: '', wage: ''}

            vi.spyOn(repositoryMock, 'findJob').mockResolvedValue(false as any)
            vi.spyOn(technologyServiceMock, 'verify').mockResolvedValue('tecnology id' as any)
            vi.spyOn(cityServiceMock,'create').mockResolvedValue('city id' as any)
            vi.spyOn(repositoryMock, 'create').mockResolvedValue({technologies: [], jobPosition: '', wage: ''} as any)

            const result = await sut.create(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
    describe('findJobs', () => {
        it('should return a object error if there is any problem in searching for technologies', async () => {
            const dataMock = {}
            const expectedResult = {error: true}

            vi.spyOn(technologyServiceMock, 'findAllTechnologies').mockResolvedValue({error: true} as any)

            const result = await sut.findJobs(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return a array of object jobs if searched for technologies', async () => {
            const dataMock = {queries: ["css"]}
            const expectedResult = [{technologies: [], jobPosition: '', wage: ''}]

            vi.spyOn(technologyServiceMock, 'findAllTechnologies').mockResolvedValue([{name: 'CSS', id: '1'}] as any)
            vi.spyOn(cityServiceMock, 'findCity').mockResolvedValue("city id" as any)
            vi.spyOn(SearchCounterServiceMock, 'addCount').mockResolvedValue('add count' as any)
            vi.spyOn(repositoryMock, 'findJobs').mockResolvedValue([{technologies: [], jobPosition: '', wage: ''}] as any)


            const result = await sut.findJobs(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return a array of object jobs if not searched for technologies', async () => {
            const dataMock = {queries: ["batata"]}
            const expectedResult = [{technologies: [], jobPosition: '', wage: ''}]

            vi.spyOn(technologyServiceMock, 'findAllTechnologies').mockResolvedValue([{name: 'CSS', id: '1'}] as any)
            vi.spyOn(cityServiceMock, 'findCity').mockResolvedValue("city id" as any)
            vi.spyOn(SearchCounterServiceMock, 'addCount').mockResolvedValue('add count' as any)
            vi.spyOn(repositoryMock, 'findJobs').mockResolvedValue([{technologies: [], jobPosition: '', wage: ''}] as any)


            const result = await sut.findJobs(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
})



