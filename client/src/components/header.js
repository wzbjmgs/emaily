//create a class based component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
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

export default connect(mapStateToProps)(Header);
