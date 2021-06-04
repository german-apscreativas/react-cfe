// ** Handle User Login
import {customFetch} from '../../../helpers/customFetch'
import { type } from '../../type'
import Swal from 'sweetalert2'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool, {registerUser, verifyCode} from '../../../helpers/cognitoUser'
import { Auth } from 'aws-amplify'


export const handleLogin = data => {
  return async (dispatch) => {
    try {
      const userData = {
        username: '',
        role: ''
      }
      dispatch({ type: 'LOADING', loading: true })
      /* const user = new CognitoUser({
        Username: data.email,
        Pool: UserPool
      })

      const authDetails = new AuthenticationDetails({
        Username: data.email,
        Password: data.password
      })

      user.authenticateUser(authDetails, {
        onSuccess: async data => {
          localStorage.setItem('token', data.idToken.jwtToken)
          const request = await customFetch(
            '/api/user-info',
            'GET',
            false
          )
          localStorage.setItem('userData', JSON.stringify(request.user))
          dispatch({ type: 'LOADING', loading: false })
          dispatch({ type: 'LOGIN', data: request.user })
        },
        onFailure: err => {
          dispatch({ type: 'LOADING', loading: false })
          Swal.fire({
            icon: 'error',
            text: 'Usuario o contraseña incorrecta'
          })
        }
      }) */
    /*const request = await customFetch(
        '/dev/login',
        'POST',
        true, 
        {username: data.username, password: data.password}
      )
      console.log("Estamos en el request de Index", request)
      if (request.token) {
        localStorage.setItem('userData', JSON.stringify(request.user))  
        localStorage.setItem('token', request.token)
        dispatch({ type: 'LOGIN', data: request.user })
      } */
      const LoginAmplify = await Auth.signIn(data.username, data.password)
      console.log(LoginAmplify)
      const token = LoginAmplify.signInUserSession.accessToken.jwtToken
      userData.username = LoginAmplify.username
      userData.role = LoginAmplify.attributes['custom:role']
      if (token) {
        localStorage.setItem('userData', JSON.stringify(userData))  
        localStorage.setItem('token', token)
        dispatch({ type: 'LOGIN', data: userData })
      }
      dispatch({ type: 'LOADING', loading: false })
    } catch (e) {
      dispatch({ type: 'LOADING', loading: false })
    }
  }  
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })

    const user = UserPool.getCurrentUser()
    if (user) user.signOut()
    console.log("USER", user)
    Auth.signOut()
    dispatch({type: type.resetDepartments})
    dispatch({type: type.resetTicket})
    dispatch({type: type.resetRol})
    dispatch({type: type.resetUser})
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
  }
}

export const handleRegister = (data, history) => {
  return async dispatch => {
    try {
      console.log("Data", data)
      dispatch({type: 'LOADING', loading: true})
      // const resp = await registerUser(UserPool, email, password)
      // if (resp) {
      
      const request = await customFetch('/dev/register', 'POST', true, {...data})
      console.log(request.message)
      if (request.message) {
        Swal.fire({
          icon: 'success',
          text: 'Usuario registrado correctamente',
          onClose: () => {
            history.push('/login')
          }
        })
      }
      
      dispatch({type: 'LOADING', loading: false}) 
    } catch (e) {
      let txt = 'Ha ocurrido un error al momento de registrar, intentelo mas tarde'
      if (e.message) txt = e.message
      Swal.fire({
        icon: 'error',
        text: txt
      })
      dispatch({type: 'LOADING', payload: false})
    }
   
  }
}

export const handleVerify = (code, history) => {
  return async (dispatch) => {
    try {
      const email = localStorage.getItem('email_validate')
      
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool
      })

      const resp = await verifyCode(user, code)
      Swal.fire({
        icon: 'success',
        text: 'Se verifico la cuenta correctamente',
        onClose: () => {
          localStorage.removeItem('email_validate')
          history.push('/login')
        }
      })
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo verificar este código'
      })
    }
  }
}