import express from 'express'
import { isAuthenticated } from '../midlwares/auth'

const router = express.Router()

router.post('/create-order', isAuthenticated, function (req, res, next) {
    console.log('res => ', res)
    console.log('req => ', req)
})

export default router
