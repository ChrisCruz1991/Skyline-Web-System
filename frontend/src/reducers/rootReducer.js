import clients from './clientReducer'
import vehicles from './vehicleReducer'
import employees from './employeeReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    clients: clients,
    vehicles: vehicles,
    employees: employees
})


export default rootReducer;