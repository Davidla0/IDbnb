const initialState = {
    stays: [],
    // filterBy: null,
    filterBy: {
        name: '',
        maxPrice: 1610,
        minPrice: 50,
        labels: '',
    },
    isFilterOpen: false,
    isHeaderFilterOpen: false
}
export function stayReducer(state = initialState, action) {
    var stays
    var stay
    var isFilterOpen
    var isHeaderFilterOpen
    switch (action.type) {
        case 'SET_STAYS':
            return { ...state, stays: action.stays }

        case 'REMOVE_STAY':
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays, lastRemovedStay }

        case 'ADD_STAY':
            return { ...state, stays: [...state.stays, action.stay] }

        case 'UPDATE_STAY':
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            return { ...state, stays }

        case 'ADD_TO_CART':
            return { ...state, stay: [...state.stay, action.stay] }

        case 'REMOVE_FROM_CART':
            stay = state.stay.filter(stay => stay._id !== action.stayId)
            return { ...state, stay }

        case 'SET_IS_FILTER_OPEN':
            isFilterOpen = action.isFilterOpen
            return { ...state, isFilterOpen }
        case 'SET_IS_HEADER_FILTER_OPEN':
            isHeaderFilterOpen = action.isHeaderFilterOpen
            return { ...state, isHeaderFilterOpen }

        // case 'CLEAR_CART':
        //     return  { ...state, stay: []}
        //     
        // case 'StayUNDO_REMOVE_CART':
        //     if (state.lastRemovedStay) {
        //         return { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
        //     }

        case 'SET_FILTER_BY':
            return { ...state, filterBy: { ...action.filterBy } }
        default:
            return state;
    }
    // For debug:
    // window.stayState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    // return newState

}
