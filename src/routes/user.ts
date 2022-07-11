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

export default router
