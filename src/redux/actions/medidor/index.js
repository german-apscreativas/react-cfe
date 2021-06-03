import {customFetch} from '../../../helpers/customFetch'
import { type } from '../../type'


export const getMedidores = data => {
    return async (dispatch) => {
        try {
            console.log("Inicias getMedidor")
            const request = await customFetch('/dev/medidor')
            console.log("Medidor", request)
        } catch (error) {
            console.log(error)
        }
    }
}