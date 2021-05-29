import React, {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpeg';
import styles from './Header.module.css';
import CartButton from './CartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <CartButton showCart={props.showCart}/>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt="img banner"/>
      </div>
    </Fragment>
  )
}

export default Header;
