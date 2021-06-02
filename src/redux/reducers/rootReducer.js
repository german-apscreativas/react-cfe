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

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  department: departmenReducer,
  rol: rolesReducer,
  user: userReducer,
  ticket: ticketReducer
})

export default rootReducer
