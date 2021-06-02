import { type } from "../type"

// **  Initial State
const initialState = {
    roles: [],
    roleSelected: {},
    loading: false  
  }
  
  const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
     case type.selectRol:
       return {...state, roleSelected: action.payload}
     case type.cleanRoles:
       return {...state, roleSelected: {}}
     case type.getRoles:
       return { ...state, roles: action.payload} 
      case type.newRoles:
        return { ...state, roles: [...state.roles, action.payload] }
      case type.updateRoles:
        return { ...state, roles: state.roles.map((item) => (item.id === action.payload.id ? action.payload : item)) }
      case type.deleteRoles:
        return { ...state, roles: state.roles.filter((item) => item.id !== action.payload) }
      case type.resetRol:
        return {roles: [], roleSelected: {}}
      case type.loadRol: 
        return {...state, loading: action.payload}  
      default:
        return state
    }
  }
  
  export default rolesReducer
  