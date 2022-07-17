import mongoose from 'mongoose'

interface IStorage {
    name: string
    measurementUnit: string
    quantity: number
    category: 'Spirits' | 'Beer / Cider' | 'Mixers' | 'Ready to drink'
}

const storageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        measurementUnit: {
            type: String,
            enum: [
                'Case of 24',
                'Case of 20',
                'Case of 30',
                'Case of 18',
                'Bottle',
                'Case',
            ],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['Spirits', 'Beer / Cider', 'Mixers', 'Ready to drink'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Storage = mongoose.model('Storage', storageSchema)

export { Storage, IStorage }
