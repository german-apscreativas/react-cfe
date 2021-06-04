import {type} from '../../type'

const initialState = {
    openModal: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.uiOpenModal:
            return { ...state, openModal: true }
        case type.uiCloseModal:
            return { ...state, openModal: false }
        default: 
            return state
    }
}