import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    //this debugger will display the js generated by the following componenet
    debugger;
    return (
      <StripeCheckout
        //name prop is the big header in the mapStateToProps
        name="Emaily"
        description="$5 for 5 email credis"
        //amount in cents charged user in us currency
        amount={500}
        //this is a call back function that we will call
        //after receive success token from stripe
        //call handleToken action
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
      //pass in a child componenet to repalce default payment button
    );
  }
}

//first argument is mapStateToProps. combine state to component
export default connect(null, actions)(Payments);
