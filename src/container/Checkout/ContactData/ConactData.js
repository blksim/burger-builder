import React, { Component } from 'react';

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max',
        address: {
          street: 'streeet',
          zipCode: '14412',
          postalCode: '20149'
        }
      }
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render () {
    let form = (<form>
    <input type="text" name="name" placeholder="Your name"/>
    <input type="email" name="email" placeholder="Your email"/>
    <input type="text" name="street" placeholder="Your street"/>
    <input type="text" name="postal" placeholder="Your postal"/>
    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);

    if (this.state.loading) {
      form = <Spinner />;
    }
    
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
          {form}
      </div>
    );
  }
}

export default ContactData;