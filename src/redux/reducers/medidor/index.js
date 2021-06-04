import {type} from '../../type'

const initialState = {
    medidores: []
}

export const medidorReducer = (state = initialState, action) => {

    switch (action.type) {
        case type.getMedidores:
            return { ...state, medidores: action.payload  }
        case type.setMedidores: 
            return { ...state, medidores: action.payload }
        case type.getMedidor:
            return { ...state, medidorData: action.payload }
        case type.createMedidor:
            return { ...state, medidorData: action.payload }
        case type.newMedidor:
            return { ...state, medidores: [action.payload, ...state.medidores] }
        default:
            return state
    }
}