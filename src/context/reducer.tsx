// const initialState = {
//   cartItem: [],
// };

import { act } from "react-test-renderer";

export const reducer = (state, action) => {
 
  switch (action.type) {
    
    case 'ADD_TO_CART':
      const item=action.payload;
       const productExist=state.cartItem.find((i)=>{
             return i.brandName===item.brandName
            })

          if(productExist){
            return{
              ...state,
              cartItem:[...state.cartItem]
            }
          }

        return {
            ...state,
            cartItem:[...state.cartItem,item]
        }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItem:state.cartItem.filter((i)=>i.discountPercent!==action.payload.discountPercent)
      };
    default:
      return state;
  }
};
