import mongoose from 'mongoose'

interface IUser {
    role: 'admin' | 'delivery' | 'storage' | 'bar'
    username: string
    password: string
    token?: string
}

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'delivery', 'storage', 'bar'],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    barName: {
        type: String,
        enum: ['Vessel', 'Space', 'Garden', 'Beach', 'Entrance'],
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
})

const User = mongoose.model('User', userSchema)

export { User, type IUser }
