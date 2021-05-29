import React, {useReducer} from 'react';
import CartContext from './cart-context';

const defaultstate = {
  items: [],
  total: 0
}
const cartReducer = (lastState, action) => {
  if(action.type === "ADD") {
    const updatedState = [...lastState.items, action.item];
    const updatedAmount = lastState.total + action.item.price * action.item.total;
    const isAvailableIndex = lastState.items.findIndex(item => item.id===action.item.id);
    const existingItem = lastState.items[isAvailableIndex];
    if(existingItem) {
      const updatedState = {
        ...existingItem,
        total: action.item.total + existingItem.total
      }
      const updatedItems = [...lastState.items]
      updatedItems[isAvailableIndex] = updatedState;

      return {items: updatedItems, total: updatedAmount}
    }
    return {items: updatedState, total: updatedAmount}
  }
  if(action.type === "REMOVE") {
    const isAvailableIndex = lastState.items.findIndex(item => item.id === action.id);
    const existingItem = lastState.items[isAvailableIndex];
    const updatedAmount = lastState.total - existingItem.price;
    let allItems = [];
    if(existingItem.total === 1) {
      allItems = lastState.items.filter(item => item.id !== action.id)
    } else {
      allItems = [...lastState.items];
      existingItem.total = existingItem.total - 1;
      allItems[isAvailableIndex] = {...existingItem};
    }
    return {items: allItems, total: updatedAmount, test: existingItem.total}
  }

  if(action.type === "CLEAR") {
    return defaultstate
  }

  return defaultstate
}
// this act as an higher order component which wraps any other component requiring access to context data
// All context management happens here itself
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultstate);

  const addItemHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item})
  }

  const removeItemHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id})
  }

  const clearHandler = (id) => {
    dispatchCartAction({type: 'CLEAR'})
  }

  const cartContext = {
    items: cartState.items,
    total: cartState.total,
    test: cartState.total,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearForm: clearHandler
  }
  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}

export default CartProvider;
