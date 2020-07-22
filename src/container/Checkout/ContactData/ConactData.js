import React, { Component } from 'react';

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        minLength: 3,
        maxLength: 5
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'avenue 4th'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
   
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '112121'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Germany'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        }
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1231'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'testemail@com'
        },
        value: '',
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) { // if there're no validation rules are defined
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
 
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm // not a deep clone
    }
    const updatedFormElement = { 
      ...updatedOrderForm[inputIdentifier] 
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) { // check all input's validity
      // looping through all the elements
      // if this is false and formIsValid was true
      // then the resulting value will be false and FormIsValid will be set to false 
      // because false overrides true.
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render () {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (<form onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
      ))}
    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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