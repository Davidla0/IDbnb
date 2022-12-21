
const initialState = {
  order: {},
  orders: {},
  dates: {
    startDate: null,
    endDate: null
  }
}

export function orderReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_ORDER':
      return { ...state, order: action.order }
    case 'SET_ORDERS':
      return { ...state, orders: action.orders }
    case 'SAVE_ORDER':
      return { ...state, order: action.order }
    case 'SET_DATES':
      return { ...state, dates: action.dates }
    default:
      return state
  }
}
