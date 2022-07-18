import mongoose from 'mongoose'

interface IOrder {
    createdBy: string
    orderedItems: IOrderItem[]
    comment?: string
    confirmedOrderStorageId?: string
    confirmedOrderStorageTime?: string
    confirmPackedOrderStorage?: IOrderItem[]
    confirmPackedOrderStorageId?: string
    confirmPackedOrderStorageTime?: string
    confirmOrderPickupId?: string
    confirmOrderPickupTime?: string
    confirmOrderPickedUp?: IOrderItem[]
    confirmDeliveredOrderBarId?: string
    confirmDeliveredOrderBarTime?: string
    confirmDeliveredOrderBar: IOrderItem[]
    confirmDeliveredOrderDeliveryId?: string
    confirmDeliveredOrderDeliveryTime?: string
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
        confirmedOrderStorageTime: {
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
        confirmPackedOrderStorageTime: {
            type: String,
        },
        confirmOrderPickupId: {
            type: String,
        },
        confirmOrderPickupTime: {
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
        confirmDeliveredOrderBarTime: {
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
        confirmDeliveredOrderDeliveryTime: {
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
