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

router.put('/:itemId', isAuthenticated, function (req, res, next) {
    const { itemId } = req.params
    const { user } = req.body

    const { name, category, measurementUnit, quantity } = req.body.item

    if (!user || user.role !== 'admin') {
        return next(new Error('You dont have the rights'))
    }

    Storage.findByIdAndUpdate(itemId, {
        name,
        category,
        measurementUnit,
        quantity,
    }).then((newItem) => res.json({ item: newItem }))
})

router.delete('/:itemId', isAuthenticated, function (req, res, next) {
    const { itemId } = req.params
    const { user } = req.body

    if (!user || user.role !== 'admin') {
        return next(new Error('You dont have the rights'))
    }

    Storage.findByIdAndDelete(itemId).then(() =>
        res.json({ message: 'Item deletet successfully' })
    )
})

router.post('/', isAuthenticated, function (req, res, next) {
    const { user } = req.body
    const { name, category, measurementUnit, quantity } = req.body.item

    if (!user || user.role !== 'admin') {
        return next(new Error('You dont have the rights'))
    }

    if (!name || !category || !measurementUnit || !quantity) {
        return next(new Error('You need more stuff'))
    }

    Storage.create({ name, measurementUnit, quantity, category }).then(
        (newItem) =>
            res.json({ message: 'Item created successfully', item: newItem })
    )
})

export default router
