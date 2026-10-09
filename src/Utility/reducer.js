
import { Type } from './action.type';

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
     
      const existingItem = state.basket.find((item) => item.id === action.item.id);
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }]
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id ? { ...item, amount: item.amount + 1 } : item;
        });

        return {
          ...state,
          basket: updatedBasket
        };
      }
 case Type.REMOVE_FROM_BASKET:
   const index = state.basket.findIndex((item) => item.id === action.item.id);
   let newBasket = [...state.basket];    
   index >= 0 ? newBasket.splice(index, 1) :
    console.warn(`Can't remove product (id: ${action.item.id}) 
      as it's not in basket!`);
   return {
     ...state,
     basket: newBasket
   };
    default:
      return state;
  }
};

  