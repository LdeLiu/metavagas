import mongoose,{Schema, model} from "mongoose";

const searchCountSchema = new Schema({
    technology: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Technology',
        require: true
    },
    cities:[
        {
            city:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "City"
            },
            count:{
                type: Number,
                default: 1
            }
        }
    ],
    count:{
        type: Number,
        default: 1
    }
},{timestamps: true})

export type searchCountType = mongoose.InferSchemaType<typeof searchCountSchema>

export const SearchCount: mongoose.Model<searchCountType> = model('SearchCount', searchCountSchema)