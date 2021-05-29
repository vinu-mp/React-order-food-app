import styles from './MealsAvailable.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import {useEffect, useState} from 'react';

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://food-order-92dbf-default-rtdb.firebaseio.com/meals.json');
        const responseData = await response.json();
        if(!response.ok || response.status !== 200) {
          throw new Error('Some thing went wrong')
        }
        let DUMMY_MEALS = [];
        for(let key in responseData) {
          DUMMY_MEALS.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }
        setMeals(DUMMY_MEALS);
        setLoading(false)
      } catch(error) {
        setLoading(false)
        setErrorState(true)
      }
      
    })()
  },[])
  const allMeals = meals.map(item => <MealItem key={item.id} id={item.id} attr={item}></MealItem>)
  if(loading) {
    return <p className={styles.loading}>Loading...</p>
  }
  if(errorState) {
    return <p className={styles.error}>something went wrong</p>
  }
  return <section className={styles.meals}>
    {allMeals.length > 0 && <Card><ul>{allMeals}</ul></Card>}
  </section>
}

export default MealsAvailable;
