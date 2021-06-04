import {customFetch} from '../../../helpers/customFetch'
import { type } from '../../type'


export const setMedidores = data => ({
    type: type.setMedidores, payload: data
})

export const newMedidor = data => ({
    type: type.newMedidor, payload: data
})

export const getMedidores = data => {
    return async (dispatch) => {
        try {
            const request = await customFetch('/dev/medidor', 'GET', false)
            dispatch(setMedidores(request.data))
            return request.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const createMedidor = (data) => {
    return async (dispatch) => {
        console.log("CREAR MEDIDOR", data)
        try {
            const request = await customFetch('/dev/medidor', 'POST', false, data)
            console.log("REQUEST medidor", request)
            dispatch(newMedidor(request.data))
            return request.data
        } catch (error) {
            
        }
    }
}

export const getMedidor = data => {
    return async (dispatch) => {
        try {
            const request = await customFetch(`/dev/medidorById?medidor=`, 'GET', false, data)
            //dispatch(setMedidores(request))
        } catch (error) {
            console.log(error)
        }
    }
}

export const upMedidor = (data) => {
    return async (dispatch) => {
        console.log("UPDATE", data)
        try {
            const {idMedidor, numero_medidor, watts} = data
            const request = await customFetch(`/dev/medidor/${idMedidor}`, 'PUT', false, ({medidor: numero_medidor, watts}))
            console.log(request)
            return request
        } catch (error) {
            console.log(error)
        }
    }
}

