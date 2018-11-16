const initState = {
    employees: [
        {id: 1, firstName: 'Dervin', lastName: 'Castro', phone: '787-555-5555', email: 'noteimporta@.com', address: 'San Juan', salary: '30.00'},
        {id: 2, firstName: 'Dervin', lastName: 'Castro', phone: '787-555-5555', email: 'noteimporta@.com', address: 'San Juan', salary: '30.00'},
        {id: 3, firstName: 'Dervin', lastName: 'Castro', phone: '787-555-5555', email: 'noteimporta@.com', address: 'San Juan', salary: '30.00'},
        {id: 4, firstName: 'Dervin', lastName: 'Castro', phone: '787-555-5555', email: 'noteimporta@.com', address: 'San Juan', salary: '30.00'}
    ]
}

const employeeReducer = (state = initState, action) => {
    return state;
}

export default employeeReducer