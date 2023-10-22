import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config()

class Database{
    static initialize(){
        mongoose.connection.once('open', () => {
            console.log('Database was connect')
        })

        mongoose.connect(process.env.DATABASE_URL as string)
    }
}

export { Database }