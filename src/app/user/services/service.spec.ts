import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import {vi, describe, it, expect} from 'vitest'
import { UserRepository } from "../repositories/repository"
import { UserService } from "./service"
import { CommonError } from '../../../utils/commonError'
import { Crypt } from "../../../utils/crypt"


const repositoryMock = {
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    setToFavorite: vi.fn()
} as any as UserRepository

const sut = new UserService(repositoryMock)

describe("UserService", () => {
    describe("create", () => {
        it("should return an error object if the user already exists", async () => {
            const dataMock = {name: "test", email: "test@example.com", password: "test"}
            const expectedResult = {error: true, message: 'User already exists'}

            vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue({
                id: "1",
                name: "test1",
                email: "test1@example.com",
                password: "test1",
                createdAt: "",
                updatedAt: "", 
            } as any)
            vi.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'User already exists'})

            const result = await sut.create(dataMock)
            expect(result).toStrictEqual(expectedResult)
        })
        it("must return a created user object", async () => {
            const dataMock = {name: "test", email: "test@example.com", password: "test"}
            const expectedResult = {
                id: "1",
                name: "test",
                email: "test@example.com",
                password: "test",
                createdAt: "",
                updatedAt: "", 
            }

            vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(null)
            vi.spyOn(bcrypt, "hashSync").mockReturnValue("123")
            vi.spyOn(repositoryMock, 'create').mockResolvedValue({
                id: "1",
                name: "test",
                email: "test@example.com",
                password: "test",
                createdAt: ""  ,
                updatedAt: "", 
            } as any)

            const result = await sut.create(dataMock)
            expect(result).toStrictEqual(expectedResult)
        })
    })

    describe("singIn", () => {
         it('should return an error object if the email are invalid', async () => {
            const dataMock = {email: "test@example.com", password: "test"}
            const expectedResult = {error: true, message: 'Invalid credentials'}

            vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(false as any)
            vi.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'Invalid credentials'})

            const result = await sut.singIn(dataMock)
            expect(result).toStrictEqual(expectedResult)
         })
         it('should return an error object if the password are invalid', async () => {
            const dataMock = {email: "test@example.com", password: "test"}
            const expectedResult = {error: true, message: 'Invalid credentials'}

            vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue({
                id: "1",
                name: "test1",
                email: "test@example.com",
                password: "test1",
                createdAt: "" ,
                updatedAt: "" , 
            } as any)
            vi.spyOn(Crypt, 'compare').mockReturnValue(false)
            vi.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'Invalid credentials'})

            const result = await sut.singIn(dataMock)
            expect(result).toStrictEqual(expectedResult)
         })
         it('should return a token if both credentials is valid ', async () => {
            const dataMock = {email: "test@example.com", password: "test"}
            const expectedResult = 'token'

            vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue({
                id: "1",
                name: "test1",
                email: "test@example.com",
                password: "test",
                createdAt: "" ,
                updatedAt: "" , 
            } as any)
            vi.spyOn(Crypt, 'compare').mockReturnValue(true)
            vi.spyOn(JWT, 'sign').mockReturnValue('token' as any)

            const result = await sut.singIn(dataMock)
            expect(result).toStrictEqual(expectedResult)
         })
    })

    describe('Update', () => {
        it('should update object data of user and return message', async () => {
            const idMock = '1'
            const dataMock = {email: "test@example.com", password: "test"}
            const expectedResult = 'updated successfully'

            vi.spyOn(repositoryMock, 'update').mockResolvedValue('updated successfully' as any)

            const result = await sut.update(idMock,dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
    describe('setToFavorite', () => {
        it('should set favorite job and return', async () => {
            const idMock = '1'
            const dataMock = {id: 'objectId of job'}
            const expectedResult = 'objectId of job'

            vi.spyOn(repositoryMock, 'setToFavorite').mockResolvedValue('objectId of job' as any)

            const result = await sut.setToFavorite(idMock,dataMock as any)
            expect(result).toStrictEqual(expectedResult)
        })
    })
})