import { SearchCounterRepository } from 'app/searchCounter/repositories/repository'
import {vi, describe, it, expect} from 'vitest'
import { TechnologyRepository } from '../repositories/repository'
import { TechnologyService } from './service'

const repositoryMock = {
    find: vi.fn(),
    create: vi.fn(),
    findAll: vi.fn()
} as any as TechnologyRepository
const searchConterRepositoryMock = {
    getTopTechnologys: vi.fn(),
} as any as SearchCounterRepository

const sut = new TechnologyService(repositoryMock, searchConterRepositoryMock)


describe('TechnologyService', () => {
    describe('verify', () => {
        it('must check if the technology exists and then return the list', async () => {
            const dataMock = ["css"]
            const expectedResult = ['technolofy id']

            vi.spyOn(repositoryMock, 'find').mockResolvedValue({_id: 'technolofy id', name: 'CSS', createdAt: '', updatedAt: ""} as any)
            vi.spyOn(repositoryMock, 'create').mockResolvedValue({_id: 'technolofy id', name: 'CSS', createdAt: '', updatedAt: ""} as any)

            const result = await sut.verify(dataMock)
            expect(result).toStrictEqual(expectedResult)
        })
        it('must check if the technology exists, if it does not exist, create it and then return the list', async () => {
            const dataMock = ["javascript"]
            const expectedResult = ['technolofy id']

            vi.spyOn(repositoryMock, 'find').mockResolvedValue(null as any)
            vi.spyOn(repositoryMock, 'create').mockResolvedValue({_id: 'technolofy id', name: 'CSS', createdAt: '', updatedAt: ""} as any)

            const result = await sut.verify(dataMock)
            expect(result).toStrictEqual(expectedResult)
        })
    })
    describe('findAllTechnologies', () => {
        it('should return all technologies', async () => {
            const expectedResult = [{name: 'test', createdAt: '', updatedAt: ''}]

            vi.spyOn(repositoryMock, 'findAll').mockResolvedValue([{name: 'test', createdAt: '', updatedAt: ''}] as any)

            const result = await sut.findAllTechnologies()
            expect(result).toStrictEqual(expectedResult)
        })
    })
    describe('getTopTechnologies', () => {
        it('should return top five technologies searched', async () => {
            const expectedResult = [{name: 'test', createdAt: '', updatedAt: ''}]

            vi.spyOn(searchConterRepositoryMock, 'getTopTechnologys').mockResolvedValue([{name: 'test', createdAt: '', updatedAt: ''}] as any)

            const result = await sut.getTopTechnologies()
            expect(result).toStrictEqual(expectedResult)
        })
    })
})