import { orderService } from "../services/order.service"

export function getActionSaveOrder(order) {
    return { type: 'SAVE_ORDER', order }
}

export function saveDates(dates) {
    return async dispatch => {
        try {
            // order = await orderService.save(order)
            dispatch({ type: 'SET_DATES', dates })
        } catch (err) {
            console.log('UserActions: err in save dates', err)
        }

    }
}

export function getOrder(stay, order = null) {
    return async dispatch => {
        try {
            if (!order) {
                order = orderService.getNewOrder(stay)
            }
            dispatch({ type: 'SET_ORDER', order })
        } catch (err) {
            console.log('UserActions: err in load order', err)
        }
        // finally {
        //     dispatch({ type: 'LOADING_DONE' })
        // }
    }
}

export function getOrders() {
    return async dispatch => {
        try {
            const orders = await orderService.query()
            dispatch({ type: 'SET_ORDERS', orders })
            return orders
        } catch (err) {
            console.log('UserActions: err in load orders', err)

        }
    }
}

export function saveOrder(order) {
    return async dispatch => {
        try {
            if (order) {
                order = await orderService.save(order)
            }
            dispatch(getActionSaveOrder(order))
        } catch (err) {
            console.log('UserActions: err in load order', err)
        }
        // finally {
        //     dispatch({ type: 'LOADING_DONE' })
        // }
    }
}




