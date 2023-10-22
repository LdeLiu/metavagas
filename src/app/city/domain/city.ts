import mongoose, {Schema,model} from "mongoose";

const citySchema = new Schema({
    name:{
        type: String,
        require: true
    },
    UF: String
},{timestamps: true})

export type CityType = mongoose.InferSchemaType<typeof citySchema>

export const City: mongoose.Model<CityType> = model('City', citySchema)