import {createContext} from 'react';

const CartContext = createContext({
  items: [],
  quantity: '',
  addItem: (item) => {},
  removeItem: (id) => {}

});

export default CartContext;
