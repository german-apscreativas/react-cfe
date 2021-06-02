// ** Handle User Login
import {type} from '../type'
import {customFetch} from '../../helpers/customFetch'
import Swal from 'sweetalert2'
export const getRoles = () => {
  return async (dispatch, getState) => {
    const {rol:{roles}} = getState()
    // if (roles.length === 0) {
      dispatch({type: type.loadRol, payload: true})
      const request = await customFetch('/roles/all', 'GET', false)
      let infoCharged = []
      if (request.data) {
          infoCharged = [...request.data]
          dispatch({type: type.getRoles, payload: infoCharged })
          dispatch({type: type.loadRol, payload: false})
        } else {
          Swal.fire({
            icon: 'error',
            text: "No se pudo guardar este rol"
          })
          dispatch({type: type.loadRol, payload: false})
        }
      
    // }

    // ** Add to user to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
  }
}

// ** Handle User Logout
export const createRoles = (name) => {
  return async dispatch => {
    try { 
      dispatch({type: type.loadRol, payload: true})
      const request = await customFetch('/roles/create', 'POST', false, {name})
      if (request.data) {
        Swal.fire({
          icon: "success",
          text: "Se guardo el rol correctamente"
        })
        dispatch({type: type.newRoles, payload: request.data})
        dispatch({type: type.loadRol, payload: false})
      } else {
        Swal.fire({
          icon: "error",
          text: "Error al guardar rol"
        })
  
        dispatch({type: type.loadRol, payload: false})
      }
    } catch (e) {
      dispatch({type: type.loadRol, payload: false})
    }
  }
}

export const updateRoles = (data) => {
  return async dispatch => {
    dispatch({type: type.loadRol, payload: true})
    const request = await customFetch(`/roles/update/${data.id}`, 'PUT', false, {name: data.name})
    if (request) {
      Swal.fire({
        icon: "success",
        text: "Se guardo el rol correctamente"
      })
      dispatch({type: type.updateRoles, payload: data })
      dispatch({type: type.loadRol, payload: false})
    } else {
      Swal.fire({
        icon: "error",
        text: "Se produjo un error al actualizar este rol"
      })
      dispatch({type: type.loadRol, payload: false})
    } 
  }
}

export const deleteDepartment = () => {
  return dispatch => {
  }
}
