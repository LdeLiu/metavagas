import mongoose, {Schema,model} from "mongoose";

const jobSchema = new Schema({
    jobPosition:{
        type: String,
        require: true
    },
    wage:{
        type: String,
        require: true
    },
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        require: true
    },
    jobWebsite:{
        type: String,
        require: true
    },
    technologies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology',
        default: []
    }],
    company:{
        type: String,
        require: true
    },
    description:{
        type: String,
    },
    link:{
        type: String,
        require: true
    },
},{timestamps: true})


export type JobType = mongoose.InferSchemaType<typeof jobSchema>

export const Job: mongoose.Model<JobType> = model('Job', jobSchema)