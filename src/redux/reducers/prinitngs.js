import actionMethodes from '../actionMethodes/cartActionsTypes'

let printings=[]

export const printingReducer = (state = printings, action) => {
    switch (action.type) {
      case actionMethodes.getCompanies:
          {
            
            if(state.length>0)
            {
                return state;
            }
            else
            {
                    return action.payload;
            }
            }
      default:
        return state
    }
  }


  
