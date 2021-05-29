import style from './Checkout.module.css';
import {useState, useRef} from 'react';

const isEmpty = (item) => item.trim() === '';
const isFiveChars = (item) => item.trim().length >= 5;

const Checkout = (props) => {

  const [formValidity, setFormValidity] = useState({
    nameValid: true,
    streetValid: true,
    zipValid: true,
    cityValid: true
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const zipRef = useRef();
  const cityRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const zip = zipRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streeIsValid = !isEmpty(street);
    const zipIsValid = isFiveChars(zip);
    const cityIsValid = !isEmpty(city);

    const formValid = nameIsValid && streeIsValid && zipIsValid && cityIsValid;

    setFormValidity({
      nameValid: nameIsValid,
      streetValid: streeIsValid,
      zipValid: zipIsValid,
      cityValid: cityIsValid
    });

    if(!formValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      zip,
      city
    });

    // props.cancel()
  }

  return <form onSubmit={onSubmitHandler}>
    <div className={`${style.control} ${!formValidity.nameValid ? style.invalid : ''}`}>
      <label htmlFor="name">Name</label>
      <input ref={nameRef} id="name" type="text"></input>
      {!formValidity.nameValid && <p>Please enter a valid value</p>}
    </div>
    <div className={`${style.control} ${!formValidity.streetValid ? style.invalid : ''}`}>
      <label htmlFor="street">Street</label>
      <input ref={streetRef} id="street" type="text"></input>
      {!formValidity.streetValid && <p>Please enter a valid value</p>}
    </div>
    <div className={`${style.control} ${!formValidity.zipValid ? style.invalid : ''}`}>
      <label htmlFor="postal">Zipcode</label>
      <input ref={zipRef} id="postal" type="text"></input>
      {!formValidity.zipValid && <p>Please enter more than five characters</p>}
    </div>
    <div className={`${style.control} ${!formValidity.cityValid ? style.invalid : ''}`}>
      <label htmlFor="city">City</label>
      <input ref={cityRef} id="city" type="text"></input>
      {!formValidity.cityValid && <p>Please enter a valid value</p>}
    </div>
    <div className={style.actions}>
      <button type="button" onClick={props.cancel}>Cancel</button>
      <button className={style.submit}>Confirm</button>
    </div>

  </form>
}
export default Checkout;