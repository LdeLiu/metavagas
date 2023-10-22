import { ObjectId } from "mongodb"

export interface counterDataType{
    technology: string,
    city:  ObjectId
}

export interface counterPersistType{
    technology: string,
    cities: {
        city?: ObjectId
    }
}

export interface cityType{
    city: ObjectId,
    count: number
}