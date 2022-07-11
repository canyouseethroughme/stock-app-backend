import mongoose from 'mongoose'

interface IStorage {
    name: string
    measurementUnit: string
    quantity: number
    category: 'spirits' | 'beer' | 'soda'
}

const storageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        measurementUnit: {
            type: String,
            enum: ['bottle', 'case'],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['spirits', 'beer', 'soda'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Storage = mongoose.model('Storage', storageSchema)

export { Storage, IStorage }
