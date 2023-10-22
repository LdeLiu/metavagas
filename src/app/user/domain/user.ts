import mongoose, {Schema,model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancies',
        default: []
    }]
},{timestamps: true})


export type UserType = mongoose.InferSchemaType<typeof userSchema>

export const User: mongoose.Model<UserType> = model('User', userSchema)