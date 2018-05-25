import { FETCH_USER } from '../actions/types';

//first argument is state object responsbile for this reducer, default is null
//second argument is the action object
//assume initial state is an empty object
export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      //this is either user obj or false, || false becuase payload could be '', which means false
      return action.payload || false;
    default:
      return state;
  }
}
