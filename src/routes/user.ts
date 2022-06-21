import express from 'express'
import { User } from '../models/user'

import jsonwebtoken from 'jsonwebtoken'

const router = express.Router()

router.post('/login', function (req, res, next) {
    const { username, password } = req.body

    User.findOne({ where: { username } })
        .then((user) => {
            console.log('🚀 ~ file: user.ts ~ line 13 ~ .then ~ user', user)
            if (!user) return next(new Error('Wrong credentials'))

            if (user.password !== password) {
                return next(new Error('Wrong credentials'))
            }

            const token = jsonwebtoken.sign({ userId: user.id }, 'mysecretkey')

            User.findOneAndUpdate(
                { username: username },
                { token: token }
            ).catch((err) => console.log('err update => ', err))
            res.json({ user, token: 'Bearer ' + token })
        })
        .catch((err) => {
            console.log('====================================')
            console.log(err)
            console.log('====================================')
            return next(err)
        })
})

export default router
