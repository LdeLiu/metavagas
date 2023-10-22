import {vi, describe, it, expect} from 'vitest'
import { CityRepository } from '../repositories/repository'
import { CityService } from './service'

const repositoryMock = {
    create: vi.fn(),
    findCity: vi.fn()
}as any as CityRepository

const sut = new CityService(repositoryMock)

describe('CityService', () => {
    describe('Create', () => {
        it('should return a object error if not get create city', async () => {
            const dataMock = {}
            const expectedResult = {error: true}

            vi.spyOn(repositoryMock, 'create').mockResolvedValue({error: true} as any)

            const result = await sut.create(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should create city and return id', async () => {
            const dataMock = {}
            const expectedResult = 'city id'

            vi.spyOn(repositoryMock, 'create').mockResolvedValue({_id: 'city id', name: 'city name'} as any)

            const result = await sut.create(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
    describe('findCity', () => {
        it('should return a object city', async () => {
            const dataMock = {}
            const expectedResult = {_id: 'city id', name: 'city name'}

            vi.spyOn(repositoryMock, 'findCity').mockResolvedValue({_id: 'city id', name: 'city name'} as any)

            const result = await sut.findCity(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return a empty object if you dont find a city', async () => {
            const dataMock = {}
            const expectedResult = {}

            vi.spyOn(repositoryMock, 'findCity').mockResolvedValue(null as any)

            const result = await sut.findCity(dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
})