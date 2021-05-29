import Header from './components/Layout/Header';
import {useState} from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [isCartShown, setCartShow] = useState(false);

  const showCart = () => {
    setCartShow(true)
  }

  const hideCart = () => {
    setCartShow(false)
  }

  return (
    <CartProvider>
      {isCartShown && <Cart hideCart={hideCart}/>}
      <Header showCart={showCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
