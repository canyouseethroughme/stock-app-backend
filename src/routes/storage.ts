import express from 'express'
import { isAuthenticated } from '../midlwares/auth'
import { Storage } from '../models/storage'

const router = express.Router()

router.get('/', isAuthenticated, function (req, res, next) {
    Storage.find({}).then((items) => res.json({ items }))
})

router.get('/by-category', isAuthenticated, function (req, res, next) {
    Storage.find({}).then((items) => {
        const categories = new Set(items.map((el) => el.category))
        const filteredItems = [...categories].map((item) => ({
            category: item,
            brands: items.filter((el) => el.category === item),
        }))

        res.json({ items: filteredItems })
    })
})

export default router
