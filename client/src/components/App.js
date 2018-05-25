import React, { Component } from 'react';
//these are two react components
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header';
import Landing from './Landing';
//declare 4 different components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveryNew = () => <h2>SurveryNew</h2>;

//this is a app component to render different component into page
//exact means exactly match
//the header will always be displayed
class App extends Component {
  //add life cycle method that we are used to fetch users
  //once the component has been mounted to the screen
  //go to fetch user
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveryNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//connect provide all actions to App component as prop
//after this connection, we can call our actions inside App component
export default connect(null, actions)(App);
