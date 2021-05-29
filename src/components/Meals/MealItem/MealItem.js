import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
import {useContext} from 'react';

const MealItem = (props) => {
  const context = useContext(CartContext);
  var attr = props.attr;
  const price = `$${attr.price.toFixed(2)}`;

  const addToList = (quantity) => {
    context.addItem({
      id: attr.id,
      total: quantity,
      name: attr.name,
      price: attr.price
    }) 
  }
  return <li className={styles.meal}>
    <div>
      <h3>{attr.name}</h3>
      <div className={styles.description}>{attr.description}</div>
      <div className={styles.price}>{price}</div>
    </div>
    <div>
      <MealItemForm addToList={addToList} id={props.id}/>
    </div>
  </li>
}

export default MealItem;