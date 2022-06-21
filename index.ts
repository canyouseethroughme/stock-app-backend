import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

app.listen(8080, () => console.log('App running on port 8080'))
