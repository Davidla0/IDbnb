
const initialState = {
  order: {},
  orders: null,
  dates: {
    startDate: null,
    endDate: null
  }
}

export function orderReducer(state = initialState, action = {}) {
  let orders
  switch (action.type) {
    case 'SET_ORDER':
      return { ...state, order: action.order }
    case 'SET_ORDERS':
      return { ...state, orders: action.orders }
    case 'SAVE_ORDER':
      orders = state.orders.filter(order => order._id !== action.order._id)
      return { ...state, orders: [...orders, action.order]}
    case 'SET_DATES':
      return { ...state, dates: action.dates }
    default:
      return state
  }
}
