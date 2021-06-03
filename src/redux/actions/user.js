// ** Handle User Login
import {type} from '../type'
import {customFetch} from '../../helpers/customFetch'
import Swal from 'sweetalert2'
/*export const getCurrentUser = () => {
  return async (dispatch) => {
    const request = await customFetch(`/api/user-info`, 'GET', false)
    let infoCharged = {}
    if (request.user) {
      infoCharged = request.user
    }

    dispatch({type: type.selectUser, payload: infoCharged})
  }
}*/

export const getUsers = (filter = '') => {
  return async (dispatch) => {
    const request = await customFetch(`/api/get-users?${filter}`, 'GET', false)
    let infoCharged = []
    if (request.users) {
        infoCharged = [...request.users]
    }

    dispatch({type: type.getUsers, payload: infoCharged })
    // ** Add to user to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
  }
}

// ** Handle User Logout
export const createUser = (data) => {
  return async (dispatch, getState) => {
    const {department: {departments}, rol: {roles}} = getState()
    const request = await customFetch('/api/register-user', 'POST', false, {...data})
    if (request.data && request.data.insertId) {
      const departmentO = departments.find((item) => item.id === parseInt(data.departmentid))
      const rolesO = roles.find((item) => item.id === parseInt(data.rolid))
      const obj = {
        id: request.data.insertId, 
        ...data,
        department_name: departmentO?.name,
        roles_name: rolesO?.name
      }   
      Swal.fire({
        icon: 'success',
        text: 'Se creo el usuario correctamente'
      })
      dispatch({type: type.newUser, payload: obj})
    }
  }
}

export const updateUser = (data) => {
  return async (dispatch, getState) => {
    const {user: { userSelected }} = getState()
    console.log('Usuario a actualizar: ', userSelected)
    const request = await customFetch(`/api/update-user/${userSelected.id}`, 'PUT', false, {fullname: data.fullname})
    if (request) {
      const dataUpdated = {...userSelected, fullname: data.fullname}
      Swal.fire({
        icon: 'success',
        text: 'Se actualizo el usuario correctamente'
      })
      dispatch({type: type.updateUser, payload: dataUpdated })
    }
  }
}

export const updatePassword = (newPassword) => {
  return async (dispatch, getState) => {
    const {user: { userSelected }} = getState()
    const request = await customFetch(`/api/update-password/${userSelected.id}`, 'PUT', false, {password: newPassword})
    if (request) {
      //const dataUpdated = {...userSelected, fullname: data.fullname}
      Swal.fire({
        icon: 'success',
        text: 'Se actualizo el usuario correctamente'
      })
    }
  }
}
