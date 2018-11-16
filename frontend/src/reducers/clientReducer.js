const initState = {
    clients: [
        {id: 1, firstName: 'christopher', lastName: 'Castro', phone: '787-555-5555', direccion: 'San Juan'},
        {id: 2, firstName: 'Dervin', lastName: 'Castro', phone: '787-555-5555', direccion: 'San Juan'},
        {id: 3, firstName: 'Jose', lastName: 'Castro', phone: '787-555-5555', direccion: 'San Juan'},
        {id: 4, firstName: 'Angel', lastName: 'Castro', phone: '787-555-5555', direccion: 'San Juan'}
    ]
}

const clientReducer = (state = initState, action) => {
    return state;
}

export default clientReducer