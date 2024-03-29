import express from 'express'
import { isAuthenticated } from '../midlwares/auth'
import { Order, IOrderItem } from '../models/order'
import { Storage } from '../models/storage'

const router = express.Router()

router.get('/', isAuthenticated, function (req, res, next) {
    const { user } = req?.body
    Order.find({}).then((items) => {
        if (user?.role === 'bar') {
            const barOrders = items.filter((item) => item.createdBy === user.id)

            return res.json({
                orders: barOrders.filter(
                    (item) => item.createdAt.getFullYear() >= 2023
                ),
            })
        }
        return res.json({
            orders: items.filter(
                (item) => item.createdAt.getFullYear() >= 2023
            ),
        })
    })
})

router.delete('/:orderId', isAuthenticated, function (req, res, next) {
    const { orderId } = req.params
    const { user } = req?.body
    if (!user || (user?.role !== 'bar' && user?.role !== 'admin')) {
        return next(new Error("You don't have the rights"))
    }

    Order.findById(orderId).then((item) => {
        if (item && item.orderedItems) {
            item?.orderedItems.forEach((item: unknown) => {
                const orderedQuantity = (item as IOrderItem).quantity
                const itemId = (item as IOrderItem).itemId

                Storage.findById(itemId).then((foundStorageItem) => {
                    const currentTotalQuantity = foundStorageItem?.quantity
                    const newQuantity =
                        (currentTotalQuantity as number) + orderedQuantity

                    Storage.findByIdAndUpdate(itemId, {
                        quantity: newQuantity,
                    }).then((newItem) =>
                        console.log('updated item => ', newItem)
                    )
                })
            })
        }
    })

    Order.findByIdAndDelete(orderId).then((item) =>
        res.json({ message: 'Item deleted successfully' })
    )
})

router.put('/edit-order', isAuthenticated, async function (req, res, next) {
    const { user, orderedItems, comment, orderId } = req?.body
    if (!user || user?.role !== 'bar' || user?.role !== 'admin')
        try {
            const order = await Order.findById(orderId).exec()

            if (order && order.orderedItems) {
                Promise.all(
                    order.orderedItems.map(
                        (orderItem) =>
                            new Promise(async (resolve, reject) => {
                                const orderedQuantity = (
                                    orderItem as IOrderItem
                                ).quantity
                                const itemId = (orderItem as IOrderItem).itemId

                                const foundStorageItem = await Storage.findById(
                                    itemId
                                ).exec()

                                if (foundStorageItem) {
                                    const newOrderedIndex =
                                        orderedItems.findIndex(
                                            (el: IOrderItem) =>
                                                el.itemId ===
                                                (orderItem as IOrderItem).itemId
                                        )
                                    let currentOrderedNo = 0

                                    if (newOrderedIndex >= 0) {
                                        currentOrderedNo =
                                            orderedItems[newOrderedIndex]
                                                .quantity
                                    }

                                    const currentTotalQuantity =
                                        foundStorageItem?.quantity

                                    const newQuantity =
                                        (currentTotalQuantity as number) +
                                        orderedQuantity -
                                        currentOrderedNo

                                    Storage.findByIdAndUpdate(itemId, {
                                        quantity: newQuantity,
                                    }).then((newItem) => {
                                        resolve(true)
                                    })
                                }
                            })
                    )
                ).then((results) =>
                    Order.findByIdAndUpdate(orderId, {
                        orderedItems,
                        comment,
                    }).then((newOrder) =>
                        res.json({
                            message: 'Order updated successfully',
                            order: newOrder,
                        })
                    )
                )
            }
        } catch (err) {
            res.json({ err })
        }
})

//create order
router.post('/create-order', isAuthenticated, function (req, res, next) {
    const { user, orderedItems, comment, barName } = req?.body

    if (!user || (user?.role !== 'bar' && user?.role !== 'admin')) {
        return next(new Error('You dont have the rights'))
    }

    if (orderedItems?.lengh === 0) {
        return next(new Error('You need to add at least one item'))
    }

    Order.find({ createdBy: user.id }).then((orders) => {
        const activeOrders = orders.filter(
            (item) =>
                !item?.confirmDeliveredOrderDeliveryId &&
                !item?.confirmDeliveredOrderBarId
        )

        if (activeOrders?.length >= 1) {
            return next(new Error('You have an active order'))
        }

        Order.create({
            createdBy: user.id,
            barName: user.role === 'bar' ? user?.barName : barName,
            orderedItems,
            comment,
        }).then((newOrder) => {
            newOrder.orderedItems.forEach((item: unknown) => {
                const orderedQuantity = (item as IOrderItem).quantity
                const itemId = (item as IOrderItem).itemId

                Storage.findById(itemId).then((foundStorageItem) => {
                    const currentTotalQuantity = foundStorageItem?.quantity
                    const newQuantity =
                        (currentTotalQuantity as number) - orderedQuantity

                    Storage.findByIdAndUpdate(itemId, {
                        quantity: newQuantity,
                    }).then((newItem) =>
                        console.log('updated item => ', newItem)
                    )
                })
            })
            res.json({
                message: 'Order created successfully',
                oder: newOrder,
            })
        })
    })
})

//confirm order from storage
router.put(
    '/confirm-order-storage',
    isAuthenticated,
    function (req, res, next) {
        const { user, orderId } = req?.body

        if (!user || (user?.role !== 'storage' && user?.role !== 'admin')) {
            return next(new Error('You dont have the rights'))
        }
        if (!orderId) {
            return next(new Error('You need to provide an orderId'))
        }
        Order.findById(orderId).then((order) => {
            if (order?.confirmedOrderStorageId) {
                return next(new Error('Order is already confirmed'))
            }

            Order.findByIdAndUpdate(orderId, {
                confirmedOrderStorageId: user.id,
                confirmedOrderStorageTime: new Date().toISOString(),
            })
                .catch((err) =>
                    next(new Error('something went wrong, please try again'))
                )
                .then((updatedOrder) => {
                    res.json({
                        message: 'Order confirmed successfully!',
                        order: updatedOrder,
                    })
                })
        })
    }
)

// confirm packed order
router.put('/confirm-packed-order', isAuthenticated, function (req, res, next) {
    const { user, orderId, confirmPackedOrderStorage } = req?.body

    if (!user || (user?.role !== 'storage' && user?.role !== 'admin')) {
        return next(new Error('You dont have the rights'))
    }
    if (!orderId || !confirmPackedOrderStorage) {
        return next(
            new Error(
                'You need to provide orderId and confirmPackedOrderStorage'
            )
        )
    }

    Order.findById(orderId).then((order) => {
        if (order?.confirmPackedOrderStorageId) {
            return next(new Error('Order is already confirmed'))
        }

        Order.findByIdAndUpdate(orderId, {
            confirmPackedOrderStorageId: user.id,
            confirmPackedOrderStorageTime: new Date().toISOString(),
            confirmPackedOrderStorage,
        })
            .catch((err) =>
                next(new Error('something went wrong, please try again'))
            )
            .then((updatedOrder) => {
                if (order && order.orderedItems) {
                    Promise.all(
                        order?.orderedItems?.map(
                            (orderItem) =>
                                new Promise(async (resolve, reject) => {
                                    const orderedQuantity = (
                                        orderItem as IOrderItem
                                    ).quantity
                                    const itemId = (orderItem as IOrderItem)
                                        .itemId

                                    const foundStorageItem =
                                        await Storage.findById(itemId).exec()

                                    if (foundStorageItem) {
                                        const newOrderedIndex =
                                            confirmPackedOrderStorage.findIndex(
                                                (el: IOrderItem) =>
                                                    el.itemId ===
                                                    (orderItem as IOrderItem)
                                                        .itemId
                                            )
                                        let currentOrderedNo = 0

                                        if (newOrderedIndex >= 0) {
                                            currentOrderedNo =
                                                confirmPackedOrderStorage[
                                                    newOrderedIndex
                                                ].quantity
                                        }

                                        const currentTotalQuantity =
                                            foundStorageItem?.quantity

                                        const newQuantity =
                                            (currentTotalQuantity as number) +
                                            orderedQuantity -
                                            currentOrderedNo

                                        Storage.findByIdAndUpdate(itemId, {
                                            quantity: newQuantity,
                                        }).then((newItem) => {
                                            resolve(true)
                                        })
                                    }
                                })
                        )
                    ).then((results) =>
                        res.json({
                            message: 'Order packed successfully!',
                            order: updatedOrder,
                        })
                    )
                }
            })
    })
})

//confirm order pick up
router.put('/confirm-pick-up', isAuthenticated, function (req, res, next) {
    const { user, orderId, confirmOrderPickedUp } = req?.body

    if (!user || (user?.role !== 'delivery' && user?.role !== 'admin')) {
        return next(new Error('You dont have the rights'))
    }

    if (!orderId || !confirmOrderPickedUp) {
        return next(
            new Error('You need to provide orderId and confirmOrderPickedUp')
        )
    }

    Order.findById(orderId).then((order) => {
        if (order?.confirmOrderPickupId) {
            return next(new Error('Order is already picked up'))
        }

        Order.findByIdAndUpdate(orderId, {
            confirmOrderPickupId: user.id,
            confirmOrderPickupTime: new Date().toISOString(),
            confirmOrderPickedUp,
        })
            .catch((err) =>
                next(new Error('something went wrong, please try again'))
            )
            .then((updatedOrder) => {
                res.json({
                    message: 'Order picked up successfully!',
                    order: updatedOrder,
                })
            })
    })
})

// confirm delivered order items from bar
router.put(
    '/confirm-delivered-bar',
    isAuthenticated,
    function (req, res, next) {
        const { user, orderId, confirmedItems } = req?.body

        if (!user || (user.role !== 'bar' && user.role !== 'admin')) {
            return next(new Error('You dont have the rights'))
        }

        if (!orderId || !confirmedItems) {
            return next(
                new Error('You need to provide orderId and confirmedItems')
            )
        }
        Order.findById(orderId).then((order) => {
            if (order?.confirmDeliveredOrderBarId) {
                return next(
                    new Error('Order is already confirmed on the bar side')
                )
            }

            Order.findByIdAndUpdate(orderId, {
                confirmDeliveredOrderBarId: user.id,
                confirmDeliveredOrderBarTime: new Date().toISOString(),
                confirmDeliveredOrderBar: confirmedItems,
            })
                .catch((err) =>
                    next(new Error('something went wrong, please try again'))
                )
                .then((updatedOrder) => {
                    res.json({
                        message: 'Order confirmed successfully!',
                        order: updatedOrder,
                    })
                })
        })
    }
)

// confirm delivered order items from delivery team
router.put(
    '/confirm-delivery-delivery',
    isAuthenticated,
    function (req, res, next) {
        const { user, orderId, confirmedItems } = req?.body

        if (!user || (user.role !== 'delivery' && user.role !== 'admin')) {
            return next(new Error('You dont have the rights'))
        }

        if (!orderId || !confirmedItems) {
            return next(
                new Error('You need to provide orderId and confirmedItems')
            )
        }
        Order.findById(orderId).then((order) => {
            if (order?.confirmDeliveredOrderDeliveryId) {
                return next(
                    new Error('Order is already confirmed on the delivery side')
                )
            }

            Order.findByIdAndUpdate(orderId, {
                confirmDeliveredOrderDeliveryId: user.id,
                confirmDeliveredOrderDeliveryTime: new Date().toISOString(),
                confirmDeliveredOrderDelivery: confirmedItems,
            })
                .catch((err) =>
                    next(new Error('something went wrong, please try again'))
                )
                .then((updatedOrder) => {
                    res.json({
                        message: 'Order confirmed successfully!',
                        order: updatedOrder,
                    })
                })
        })
    }
)

//get active orders
router.get('/active-orders', isAuthenticated, function (req, res, next) {
    const { user } = req.body

    if (
        user?.role === 'admin' ||
        user?.role === 'bar' ||
        user?.role === 'delivery'
    ) {
        Order.find({
            confirmDeliveredOrderBarId: undefined,
            confirmDeliveredOrderDeliveryId: undefined,
        }).then((orders) =>
            res.json({
                orders: orders.filter(
                    (item) => item.createdAt.getFullYear() >= 2023
                ),
            })
        )
    }

    if (user?.role === 'bar') {
        Order.find({ confirmOrderPickupId: undefined }).then((orders) => {
            const barOrders = orders.filter(
                (item) => item.createdBy === user.id
            )
            res.json({ orders: barOrders })
        })
    }
})

//get order by id
router.get('/:id', isAuthenticated, function (req, res, next) {
    const { id } = req.params

    Order.findById(id).then((order) => res.json({ order }))
})

export default router
