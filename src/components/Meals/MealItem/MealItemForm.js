import style from './MealItemForm.module.css';
import Input from '../../UI/Input';
import React, {useRef, useState} from 'react';

const MealItemForm = (props) => {
  const [isValid, setValid] = useState(true);

  const quantityref = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const inputValue = quantityref.current.value;
    const inputValueInt = +inputValue;
    if(inputValue.trim().length === 0 || inputValueInt < 1 || inputValueInt > 5) {
      setValid(false);
      return;
    }
    props.addToList(inputValueInt);
  }

  return <form onSubmit={formSubmitHandler} className={style.form}>
    <Input ref={quantityref} label="Quantity" input={{id: 'amount_'+props.id, type: 'number', max: '5', min: '1', step: '1', defaultValue: '1'}} />
    <button>+Add</button>
    {!isValid && <p>Please enter a valid number</p>}
  </form>
}

export default MealItemForm;
