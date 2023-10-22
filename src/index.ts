import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import { Database } from './database/Database.js'
import { Routers } from 'routers/routers.js';

Database.initialize()

const app = express();
app.use(express.json())
app.use(Routers)


app.listen(3333, () => console.log(`Server runing at ${process.env.PORT}`))