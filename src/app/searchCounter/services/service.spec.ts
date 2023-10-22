import {vi, describe, it, expect} from 'vitest'
import { SearchCounterRepository } from "../repositories/repository";
import { SearchCountService } from './service';


const repositoryMock = {
    findTechCount: vi.fn(),
    addCount: vi.fn(),
    create: vi.fn()
} as any as SearchCounterRepository

const sut = new SearchCountService(repositoryMock)

describe('SearchCounterService', () => {
    describe('addCount', () => {
        it('should create and return an object of searchCounter if not exists', async () => {
            const dataMock = {city: 'city'}
            const expectedResult = {count: 1, cities: [], technology: '' }

            vi.spyOn(repositoryMock, 'findTechCount').mockResolvedValue(false as any)
            vi.spyOn(repositoryMock, 'create').mockResolvedValue({count: 1, cities: [], technology: '' } as any)

            const result = await sut.addCount(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return a error object if return error from fetch', async () => {
            const dataMock = {}
            const expectedResult = {error: true, message: "error message"}

            vi.spyOn(repositoryMock, 'findTechCount').mockResolvedValue({error: true, message: "error message"})

            const result = await sut.addCount(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the modified object if it exists', async () => {
            const dataMock = {}
            const expectedResult = {count: 2, cities: [], technology: '' }

            vi.spyOn(repositoryMock, 'findTechCount').mockResolvedValue({} as any)
            vi.spyOn(repositoryMock, 'addCount').mockResolvedValue({count: 2, cities: [], technology: '' } as any)

            const result = await sut.addCount(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the modified object if it exists and have city in counter', async () => {
            const dataMock = {city: 'city'}
            const expectedResult = {count: 2, cities: [], technology: '' }

            vi.spyOn(repositoryMock, 'findTechCount').mockResolvedValue({cities: [{city: 'city', count: 1}]} as any)
            vi.spyOn(repositoryMock, 'addCount').mockResolvedValue({count: 2, cities: [], technology: '' } as any)

            const result = await sut.addCount(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the modified object if it exists and dont have city in counter', async () => {
            const dataMock = {city: 'jacobina'}
            const expectedResult = {count: 2, cities: [], technology: '' }

            vi.spyOn(repositoryMock, 'findTechCount').mockResolvedValue({cities: [{city: 'city', count: 1}]} as any)
            vi.spyOn(repositoryMock, 'addCount').mockResolvedValue({count: 2, cities: [], technology: '' } as any)

            const result = await sut.addCount(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
})