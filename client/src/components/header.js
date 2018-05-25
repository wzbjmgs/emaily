//create a class based component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

//put function inside to decide what to render or display
//in header
class Header extends Component {
  //this is the way store object update state in all react components
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google </a>
          </li>
        );
      default:
        //return a array needs keys for each of item if user logged in
        return [
          <li key="1">
            <Payments />
          </li>,
          //this.props.auth is the return obj of auth reducer inside the
          //payload of return obj, including res.data Credits:{' '}
          <li key="3" style={{ margin: '0, 10px' }}>
            Credits : {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

//state is your redux-store object
//state call combineReducers and then fetch authReducer, which return state to store
function mapStateToProps(state) {
  //state.auth is the return value from reducer.
  return { auth: state.auth };
}

//second argument is actions, there is no need to put here.
export default connect(mapStateToProps)(Header);
