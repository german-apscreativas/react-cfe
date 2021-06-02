
// **  Initial State
const initialState = {
  userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {},
  logged: localStorage.getItem("token") !== null && true,
  loading: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userData: action.data, logged: true }
    case 'LOGOUT':
      return { ...state, userData: {}, logged: false }
    case 'REGISTER':
      return { ...state, userData: {}, loading: true }
    case 'LOADING': 
      return {...state, loading: action.loading}
    default:
      return state
  }
}

export default authReducer
