import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import usersRouter from './src/routes/user'
import ordersRouter from './src/routes/orders'
import storageRouter from './src/routes/storage'
import cors from 'cors'
import { createUsers } from './src/seeds/user'
import { createStorage } from './src/seeds/storage'

const PORT = process.env.PORT || 8080;

const app = express()
app.use(json())

mongoose.connect(
    'mongodb+srv://root:root@stockapp.gk07c.mongodb.net/?retryWrites=true&w=majority',
    () => console.log('database connection successful')
)
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// createUsers()
// createStorage()
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)
app.use('/storage', storageRouter)

app.listen(PORT, () => console.log(`App running on port ${PORT}`))
