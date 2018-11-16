const initState = {
    vehicles: [
        {id: 1, make: 'Honda', model: 'Civic', year: '2006', status: 'red'},
        {id: 2, make: 'Jaguar', model: 'La Bestia', year: '2018', status: 'yellow'},
        {id: 3, make: 'Honda', model: 'Civic', year: '2006', status: 'green'},
        {id: 4, make: 'Mazda', model: 'Mazda3', year: '2008', status: 'red'}
        ]
}

const vehicleReducer = (state = initState, action) => {
    return state;
}

export default vehicleReducer