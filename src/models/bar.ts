import mongoose from 'mongoose'

interface IBar {
    name: 'Vessel' | 'Space' | 'Garden' | 'Beach' | 'Entrance' | 'HQ'
    users: String[]
}

const barSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Vessel', 'Space', 'Garden', 'Beach', 'Entrance'],
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

export { Bar, type IBar }
