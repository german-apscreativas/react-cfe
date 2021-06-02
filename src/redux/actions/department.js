// ** Handle User Login
import {type} from '../type'
import {customFetch} from '../../helpers/customFetch'
import Swal from 'sweetalert2'
export const getDepartments = () => {
  return async (dispatch, getState) => {
    const {department:{departments}} = getState()
    try {
      // if (departments.length === 0) {
        dispatch({type:type.loadDepartment, payload: true})
        const request = await customFetch('/departments/all', 'GET', false)
        let infoCharged = []
        if (request.data) {
            infoCharged = [...request.data]
        }
        dispatch({type: type.getDepartment, payload: infoCharged })
        dispatch({type:type.loadDepartment, payload: false})
      // }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "Error al guardar departamento"
      })
      dispatch({type:type.loadDepartment, payload: false})
    }
  }
}

// ** Handle User Logout
export const createDepartment = (name) => {
  return async (dispatch) => {
    dispatch({type:type.loadDepartment, payload: true})
    const request = await customFetch('/departments/create', 'POST', false, {name})
    if (request.data) {   
      dispatch({type: type.newDepartment, payload: request.data})
      dispatch({type:type.loadDepartment, payload: false})
    } else {
      dispatch({type:type.loadDepartment, payload: false})
    }
  }
}

export const updateDepartment = (data) => {
  return async dispatch => {
    try {
      dispatch({type:type.loadDepartment, payload: true})
      const request = await customFetch(`/departments/${data.id}`, 'PUT', false, {name: data.name})
      if (request) {
        Swal.fire({
          icon: 'success',
          text: 'Se actualizo correctamente'
        })
        dispatch({type: type.updateDepartment, payload: data })
        dispatch({type:type.loadDepartment, payload: false})
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: 'Error al actualizar departamento'
      })
      dispatch({type:type.loadDepartment, payload: false})
    } 
  }
}

export const deleteDepartment = () => {
  return dispatch => {
  }
}
