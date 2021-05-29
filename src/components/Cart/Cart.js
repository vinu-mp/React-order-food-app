import style from './Cart.module.css';
import Modal from '../UI/Modal';
import {Fragment, useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [submittingState, setSubmittingState] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false)
  const context = useContext(CartContext);
  const cartItemAddHandler = (item) => {
    context.addItem(item)
  }

  const cartItemRemoveHandler = (id) => {
    context.removeItem(id)
  }
  const total = `$${context.total.toFixed(2)}`;
  const hasItem = context.items.length > 0
  const cartItems = <ul className={style['cart-items']}>{context.items.map(item => <CartItem key={item.id} name={item.name} total={item.total} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)}</ul>

  const onOrderclickHandler = () => {
    setCheckout(true)
  }

  const submitCartData = async (data) => {
    setSubmittingState(true)
    await fetch('https://food-order-92dbf-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({user: data, orderedITems: context.items})
    });
    setSubmittingState(false);
    setSubmitted(true);
    context.clearForm();
  }

  const cartModal = <Fragment>
    {cartItems}
    <div className={style.total}>
      <span>Total Amount</span>
      <span>{total}</span>
    </div>
    { isCheckout && <Checkout onConfirm={submitCartData} cancel={props.hideCart}/> }
    {
      !isCheckout &&
      (<div className={style.actions}>
        <button className={style['button--alt']} onClick={props.hideCart}>close</button>
        {hasItem && <button className={style.button} onClick={onOrderclickHandler}>order</button> }
      </div>)
    }
  </Fragment>

  const submittingText = <p>Date is being submitted</p>
  const successSubmit = <p>Order submitted successfully</p>

  return <Modal hideCart={props.hideCart}>
    {submittingState ? submittingText : isSubmitted ? successSubmit: cartModal }
  </Modal>
}
export default Cart;
