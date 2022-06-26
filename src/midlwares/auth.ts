import { NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { TokenType } from '../types/types'

export const isAuthenticated: RequestHandler = (req, res, next) => {
    const error = new Error('Unauthorized')

    const token = req.get('Authorization')
    console.log('🚀 ~ file: auth.ts ~ line 10 ~ token', token)

    if (!token || !token.length) {
        return next(error)
    }

    const data = jwt.verify(token.replace('Bearer ', ''), 'mysecretkey')

    if (!data) return next(error)
    // TODO: fix types
    User.findOne({
        where: { id: (data as TokenType).userId },
        attributes: { exclude: ['password'] },
    })
        .then((user) => {
            // req.set.user = user
            res.req.body.user = user
            return next()
        })
        .catch(() => {
            return next(error)
        })
}
