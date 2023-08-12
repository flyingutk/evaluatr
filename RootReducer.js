const RootReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SELECET_CURRENCY':
            return {
                ...state,
                selectedCurrency: action.payload
            }
        case 'UPDATE_EXCHANGE_RATE': {
            return {
                ...state,
                exchangeRate: action.payload
            }
        }
        case 'UPDATE_SELECTED_LANGUAGE':
            return {
                ...state,
                selectedLanguage: action.payload
            }
        case 'UPDATE_USER_PROFILE':
            return {
                ...state,
                userProfile: action.payload
            }
        case 'REMOVE_USER_DETAILS':
            return {
                ...state,
                userProfile: {}
            }
        case 'UPDATE_BRAND_IMGS':
            return {
                ...state,
                brandImgs: action.payload
            }
        case 'UPDATE_CATEGORY_IMGS':
            return {
                ...state,
                categoryImgs: action.payload
            }

        case 'SET_ITEM_REQUESTED':
            return {
                ...state,
                itemRequested: action.payload
            }
        default:
            return state;
    }
}

export default RootReducer;