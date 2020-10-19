const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CHARACTER':
            let charactersA = state.charactersCar;
            const i = charactersA.map((e) => { return e.id; }).indexOf(action.payload.id);
            if (i === -1) {
                const data = {
                    count: 1,
                    id: action.payload.id,
                    price: action.payload.price,
                    name: action.payload.name
                }
                return {
                    ...state,
                    charactersCar: [...state.charactersCar, data],
                    total: state.total + action.payload.price
                };
            } else {
                charactersA[i].count = charactersA[i].count + 1;
                return {
                    ...state,
                    charactersCar: charactersA,
                    total: state.total + action.payload.price
                };
            }
        case 'REMOVE_CHARACTER':
            let charactersR = state.charactersCar;
            const j = charactersR.map((e) => { return e.id; }).indexOf(action.payload.id);
            if (charactersR[j].count === 1) {
                return {
                    ...state,
                    charactersCar: charactersR.filter((items) => items.id !== action.payload.id),
                    total: state.total - action.payload.price
                };
            } else {
                charactersR[j].count = charactersR[j].count - 1;
                return {
                    ...state,
                    charactersCar: charactersR,
                    total: state.total - action.payload.price
                };
            }
        case 'CLEAR_CHARACTER':
            return {
                ...state,
                charactersCar: [],
                total: 0
            };
        default:
            return state;
    }
};

export default reducer;