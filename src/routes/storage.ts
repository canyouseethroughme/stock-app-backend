import express from 'express'
import { isAuthenticated } from '../midlwares/auth'
import { Storage } from '../models/storage'

const router = express.Router()

router.get('/', isAuthenticated, function (req, res, next) {
    Storage.find({}).then((items) => res.json({ items }))
})

export default router
