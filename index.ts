import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'

const app = express()
app.use(json())

mongoose.connect('mongodb://localhost:27107/stockApp', {}, () =>
    console.log('database connection successful')
)

app.listen(8080, () => console.log('App running on port 8080'))
