import mongoose from 'mongoose'

interface IBar {
    name: 'Vessel' | 'Space' | 'Garden'
    users: String[]
}

const barSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Vessel', 'Space', 'Garden'],
        required: true,
    },
    users: [
        {
            type: String,
            required: true,
        },
    ],
})

const Bar = mongoose.model('Bar', barSchema)

export { Bar, IBar }
