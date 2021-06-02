export const initialState ={
    basket :[],
    user:null
};

//Selector and all the price of the items in basket
export const getBasketTotal=(basket) =>
basket?.reduce((amount,item) => item.price +amount ,0);

const reducer = (state,action) => {
    console.log(action)
    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state,
                // below line=initial state of basket+item to be pushed
                basket: [...state.basket,action.item],
            };

        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[] 
            };

        case "REMOVE_FROM_BASKET":
            const index=state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket=[...state.basket];
            if(index>=0){
              newBasket.splice(index,1);
            }
            else{
                console.warn(`Can not remove product (id:${action.id}) as it is not in baket!`)  
            }

            return {
                ...state,
                basket:newBasket
            }

            case "SET_USER":
                return{
                    ...state,
                    user:action.user

                }



            default:
                return state;
    }
};

export default reducer;