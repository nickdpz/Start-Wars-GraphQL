export const addProductCar = (payload) => ({
    type: 'ADD_CHARACTER',
    payload,
});

export const removeProductCar = (payload) => ({
    type: 'REMOVE_CHARACTER',
    payload,
});

export const clearProductCar = (payload) => ({
    type: 'CLEAR_CHARACTER',
    payload,
});