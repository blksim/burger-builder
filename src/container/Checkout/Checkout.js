import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ConactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search); // returns a URLSearchParams object instance.
        const ingredients = {};
        let price = 0;
        // An object implementing URLSearchParams can directly be used in a for...of structgure
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];

            }
        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCanceledHandler = () => {
        console.log('checkoutCanceled');
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('checkoutContinued');
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => 
                    (<ContactData 
                        ingredients={this.state.ingredients}
                        price={this.state.price} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;