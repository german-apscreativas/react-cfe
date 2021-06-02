import { type } from "../type"

// **  Initial State
const initialState = {
    departments: [],
    departmentSelected: {},
    loading: false 
  }
  
  const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case type.getDepartment:
        return { ...state, departments: action.payload }
      case type.newDepartment:
        return { ...state, departments: [...state.departments, action.payload] }
      case type.cleanDepartment: 
        return { ...state, departmentSelected: {}}
      case type.selectDepartment: 
        return { ...state, departmentSelected: action.payload}
      case type.updateDepartment:
        return { ...state, departments: state.departments.map((item) => (item.id === action.payload.id ? action.payload : item)) }
      case type.deleteDepartment:
        return { ...state, departments: state.departments.filter((item) => item.id !== action.payload) }
      case type.resetDepartments:
        return { departments: [], departmentSelected: {}}
      case type.loadDepartment: 
        return {...state, loading: action.payload}  
      default:
        return state
    }
  }
  
  export default departmentReducer
  