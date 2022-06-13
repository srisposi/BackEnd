export const initialState = {
    basket: [],
    user: null,
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.precio + amount, 0);
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
            case "REMOVE_ITEM":
                const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
                let newBasket = [...state.basket];
                if (index >= 0){
                    newBasket.splice(index, 1);
                } else {
                    console.log("Can't remove product")
                }
                return {
                    ...state,
                    basket: newBasket,
                };
            case "SET_USER":
                return{
                    ...state,
                    user:action.user
                }
            case "EMPTY_BASKET":
                return{
                    ...state,
                    basket: action.basket
                }    
            default: return state;
        }
}

export default reducer;