import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import usersRouter from './src/routes/user'

const app = express()
app.use(json())

mongoose.connect(
    'mongodb+srv://root:root@stockapp.gk07c.mongodb.net/?retryWrites=true&w=majority',
    () => console.log('database connection successful')
)

app.use('/users', usersRouter)

app.listen(8080, () => console.log('App running on port 8080'))
