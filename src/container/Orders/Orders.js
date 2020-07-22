import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    // because I only want to fetch orders when this is loaded.
    // there's no way we will go there without remounting it
    // so componentDidUpdate is not what I'm looking for.
    axios.get('/orders.json')
      .then(response => {
        console.log(response);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          }); 
      // distribute the properties off the Order obj I've fetched from firebase with the spread operator
      // and add one new property ID which is the key because remember the key in this obj we've fetched from firebase where the ID's created by firebase.    
      }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(error => {
        this.setState({loading: true});
      })
  }
  
  render () {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);