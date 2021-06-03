import {type} from '../../type'

const initialState = {
    medidores: []
}

const medidorReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.getMedidores:
            return { ...state, medidores: action.payload,  }
        default:
            return state
    }
}