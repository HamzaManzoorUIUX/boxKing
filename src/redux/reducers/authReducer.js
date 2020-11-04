import actionMethodes from '../actionMethodes/cartActionsTypes'

let auth={};

 export const Authreducer =  (state = auth, action) => {
    switch (action.type) {
      case actionMethodes.login: {

        return {...action.payload };
      }
      case  actionMethodes.logOut: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return {};
      }

  
      default:
        return state;
    }
  }
