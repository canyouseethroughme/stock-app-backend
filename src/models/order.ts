import mongoose from 'mongoose'

interface IOrder {
    createdBy: string
    orderedItems: IOrderItem[]
    comment?: string
    confirmedOrderStorageId?: string
    confirmPackedOrderStorage?: IOrderItem[]
    confirmPackedOrderStorageId?: string
    confirmOrderPickupId?: string
    confirmOrderPickedUp?: IOrderItem[]
    confirmDeliveredOrderBarId?: string
    confirmDeliveredOrderBar: IOrderItem[]
    confirmDeliveredOrderDeliveryId?: string
    confirmDeliveredOrderDelivery?: IOrderItem[]
}
interface IOrderItem {
    itemId: string
    quantity: number
    name: string
    measurementUnit: string
}

const orderSchema = new mongoose.Schema(
    {
        createdBy: {
            type: String,
            required: true,
        },
        barName: {
            type: String,
            required: true,
        },
        orderedItems: [
            {
                itemId: String,
                quantity: Number,
                name: String,
                measurementUnit: String,
            },
        ],
        comment: {
            type: String,
        },
        confirmedOrderStorageId: {
            type: String,
        },
        confirmPackedOrderStorage: [
            {
                itemId: String,
                quantity: Number,
                name: String,
                measurementUnit: String,
            },
        ],
        confirmPackedOrderStorageId: {
            type: String,
        },
        confirmOrderPickupId: {
            type: String,
        },
        confirmOrderPickedUp: [
            {
                itemId: String,
                quantity: Number,
                name: String,
                measurementUnit: String,
            },
        ],
        confirmDeliveredOrderBarId: {
            type: String,
        },
        confirmDeliveredOrderBar: [
            {
                itemId: String,
                quantity: Number,
                name: String,
                measurementUnit: String,
            },
        ],
        confirmDeliveredOrderDeliveryId: {
            type: String,
        },
        confirmDeliveredOrderDelivery: [
            {
                itemId: String,
                quantity: Number,
                name: String,
                measurementUnit: String,
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

export { Order, IOrder, IOrderItem }
