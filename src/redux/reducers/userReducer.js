import { type } from "../type"

// **  Initial State
const initialState = {
    users: [],
    userSelected: {} 
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case type.getUsers: 
        return {...state, users: action.payload}
      case type.newUser:
        return { ...state, users: [...state.users, action.payload] }
      case type.updateUser:
        return { ...state, users: state.users.map((item) => (item.id === action.payload.id ? action.payload : item)) }
      case type.selectUser:
        return { ...state, userSelected: action.payload }
      case type.cleanUser:
        return { ...state, userSelected: {} }
      case type.resetUser:
        return {users: [], userSelected: {}}
      default:
        return state
    }
  }
  
  export default userReducer
  