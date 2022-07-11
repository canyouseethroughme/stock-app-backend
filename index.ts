import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import usersRouter from './src/routes/user'
import ordersRouter from './src/routes/orders'
import { createUsers } from './src/seeds/user'
import { createStorage } from './src/seeds/storage'

const app = express()
app.use(json())

mongoose.connect(
    'mongodb+srv://root:root@stockapp.gk07c.mongodb.net/?retryWrites=true&w=majority',
    () => console.log('database connection successful')
)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// createUsers()
// createStorage()
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)

app.listen(8080, () => console.log('App running on port 8080'))
