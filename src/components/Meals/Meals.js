import React from 'react';
import MealsSummary from './MealsSummary';
import MealsAvailable from './MealsAvailable';

const Meals = (props) => {
  return(<React.Fragment>
    <MealsSummary />
    <MealsAvailable />
  </React.Fragment>)
}

export default Meals;