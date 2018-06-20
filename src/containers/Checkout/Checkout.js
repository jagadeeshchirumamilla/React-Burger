import React, { Component } from 'react';
import { Route , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
//import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        console.log("[Checkout]:checkoutCancelledHandler called");
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log("[Checkout]:checkoutContinuedHandler called");
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to = "/"/>
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null ;
            summary = (
                <div>
                    {purchaseRedirect}
                <CheckoutSummary
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />

                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData} />
                </div>
            );
        }

        return (
            <div>
               {summary}
               
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

// const mapDispatcherToProps = dispatch => {
//     return{
//         onInitPurchase : () => dispatch(actions.purchaseInit())  
// };
// };
export default connect(mapStateToProps)(Checkout);