import mongoose from 'mongoose'

interface IBar {
    name: 'Vessel' | 'Space' | 'Astral'
    users: String[]
}

const barSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Vessel', 'Space', 'Astral'],
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
