import CartIcon from '../Cart/CartIcon';
import styles from './CartButton.module.css';
import {useContext, useEffect, useState} from 'react';
import CartContext from '../../store/cart-context';

const CartButton = (props) => {
  const [btnBump , setButtonBump] = useState(false);

  const context = useContext(CartContext);

  const { items } = context
  const itemCount = items.reduce((initial, item) => initial+= item.total, 0);
  useEffect(() => {
    console.log('use effect running')
    if(items.length === 0) {
      return;
    }
    setButtonBump(true);
    let timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items])
  const btnStyle = `${styles.button} ${btnBump ? styles.bump : ''}`
  return (
    <button className={btnStyle} onClick={props.showCart}>
      {console.log('render running')}
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{itemCount}</span>
    </button>
  );
}

export default CartButton;
