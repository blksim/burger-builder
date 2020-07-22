import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients) // 키(재료명)만 추출한 배열 
        .map(igKey => { // 각 배열 요소(재료명)마다 
            // props.ingredients[igKey] == 재료 수량 만큼 
            // 키, 타입 속성을 포함한 JSX element 배열을 생성하여 반환 
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            }); // 어떻게 디버깅하나?
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []); // concat nested array element into transformedIngredients -> accummulate into empty new array 
        console.log(transformedIngredients);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);