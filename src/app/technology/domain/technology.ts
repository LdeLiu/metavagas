import mongoose, {Schema,model} from "mongoose";

const technologySchema = new Schema({
    name:{
        type: String,
        require: true
    }
},{timestamps: true})

export type TechnologyType = mongoose.InferSchemaType<typeof technologySchema>

export const Technology: mongoose.Model<TechnologyType> = model('Technology', technologySchema)