// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import departmenReducer from './departmenReducer'
import rolesReducer from './rolesReducer'
import userReducer from './userReducer'
import ticketReducer from './ticketsReducer'
import {medidorReducer} from './medidor'
import {uiReducer} from './medidor/uiReducerMedidor'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  department: departmenReducer,
  rol: rolesReducer,
  user: userReducer,
  ticket: ticketReducer,
  medidor: medidorReducer,
  ui: uiReducer
})

export default rootReducer
