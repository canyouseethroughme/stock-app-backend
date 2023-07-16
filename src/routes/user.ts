import express from 'express'
import { User } from '../models/user'

import jsonwebtoken from 'jsonwebtoken'
import { isAuthenticated } from '../midlwares/auth'

const router = express.Router()

router.post('/login', function (req, res, next) {
    const { username, password } = req.body

    User.findOne({ username })
        .exec()
        .then((user) => {
            if (!user) return next(new Error('Wrong credentials'))

            if (user.password !== password) {
                return next(new Error('Wrong credentials'))
            }

            const token = jsonwebtoken.sign(
                {
                    userId: user.id,
                    role: user.role,
                    barName: user?.barName,
                    username: user.username,
                },
                'mysecretkey'
            )

            User.findOneAndUpdate({ username }, { token: token }).catch((err) =>
                console.log('err update => ', err)
            )
            res.json({ token: 'Bearer ' + token })
        })
        .catch((err) => {
            console.log('====================================')
            console.log(err)
            console.log('====================================')
            return next(err)
        })
})

router.get('/test-token', isAuthenticated, function (req, res, next) {
    console.log('la test')
    res.send({ muie: res.req.body.user })
})

// create user
router.post('/create', function (req, res, next) {
    const { role, username, barName, password } = req.body
    if (!role || !username || !barName || !password) {
        return next(new Error('Wrong input'))
    }

    User.findOne({ username })
        .exec()
        .then((user) => {
            if (user) return next(new Error('Username already exists'))

            User.create({ role, username, barName, password }).then((newUser) =>
                res.json({ message: 'User created successfully', use: newUser })
            )
        })
})

// getUsersByCategory
router.get('/getUsersByCategory', isAuthenticated, function (req, res, next) {
    const { user } = req.body

    const { role } = req.query

    if (user?.role !== 'admin') {
        return next(new Error("You don't have the rights"))
    }

    return User.find({ role: role }).then((items) => {
        console.log('🚀 ~ file: user.ts:79 ~ returnUser.find ~ items:', items)
        return res.json({
            users: items,
        })
    })
})

export default router
