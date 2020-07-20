import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';


const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        // we'll call componentWillMount again and again of course because the class component we return it is 
        // higher order component is created every time this is wrapped around an existing component,
        // so every time we call withErrorHnadler on the element we're exporting as we do in the burger builder.
        // so we're actually attatching multiple interceptors in our application and we're attatching them to the same axios instance.
        // once we have more pages where we might use withErrorHandler, we of course create this instance here multiple times,
        // this component here and therefore all the old interceptors, so all the interceptors we set up when we wrapped this around another component which might not be needed anymore still exsist.
        // so we have a lot of that interceptor sitting in  memory which actually are not that but which still react to our requests and in the wors case, they lead to errors or do somehow change the state of our app 
        // but even in the best case, they leak memory because that's code that still runs that is not required anymore.
        // so we should actually remove the interceptors when this component gets unmounted.
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        // Now as the name suggests, this is a lifecycle method which is executed at the point of time a component isn't required anymore.
        // we got this setup in componentWillUnmount and we should remove our interceptors with that preventing memory leaks.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render () {
            return (
                <Auxiliary>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    } 
}

export default withErrorHandler;