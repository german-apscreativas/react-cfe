import firebase from "firebase/app"
import "firebase/auth"
import Swal from "sweetalert2"
import { customFetch } from "./helpers/customFetch"

const firebaseConfig = {
  apiKey: "AIzaSyAi-_1YS3FfQ8M3OGwyfD1lis3i457ZjHc",
  authDomain: "vuexy-b232e.firebaseapp.com",
  projectId: "vuexy-b232e",
  storageBucket: "vuexy-b232e.appspot.com",
  messagingSenderId: "55308434538",
  appId: "1:55308434538:web:ea32b2dd9584a06b695e13",
  measurementId: "G-K89F99TQCW"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Logout session google
export const signOutGoogle = () => {
  firebase.auth().signOut()
}

// Login session google
export const signinWithGoogle = (type) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (snap) => {
      let request = null
      try {
        if (type === 'REGISTER') {
          request = await customFetch('/api/register', 'POST', true, {id_token: snap.credential.idToken, type: 'GO'})
          if (request.user)  {
            Swal.fire({
              icon: 'success',
              text: 'Registro hecho correctamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'error al intentar registarse'
            })
          }
        } else if (type === 'LOGIN') {
          request = await customFetch('/google-login', 'POST', true, {id_token: snap.credential.idToken})
          if (request.token) {
            localStorage.setItem('userData', JSON.stringify(request.user))  
            localStorage.setItem('token', request.token)
            return request
          } else return null
        }
      } catch (e) {
        throw new Error("Error en esta sección")
      }
      
    })
}

// Login session Facebook
export const signinWithFb = (type) => {
  const provider = new firebase.auth.FacebookAuthProvider()
  return firebase.auth()
    .signInWithPopup(provider)
    .then(async (snap) => {
      try {
        let request = null
        if (type === 'REGISTER') {
          request = await customFetch('/api/register', 'POST', true, {id_token: snap.credential.accessToken, email: snap.user.email, type: 'FB'})
  
          if (request.user)  {
            Swal.fire({
              icon: 'success',
              text: 'Registro hecho correctamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'error al intentar registarse'
            })
          }
        } else if (type === 'LOGIN') {
          request = await customFetch('/facebook-login', 'POST', true, {access_token: snap.credential.accessToken, email: snap.user.email })
          if (request.token) {
            localStorage.setItem('userData', JSON.stringify(request.user))  
            localStorage.setItem('token', request.token)
            return request
          } else Swal.fire({icon: 'error', text: 'No pudo loguarse, intentelo mas tarde'})
        }
      } catch (e) {
        console.log(e)
        throw new Error("Error en esta sección")
      }
      
    })
}
