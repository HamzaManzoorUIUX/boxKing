import actionMethodes from '../actionMethodes/cartActionsTypes'

let cart={
    items:[],
    printiingCompany:{
    },
    total:0,
    servicesSharges:0,
    subTotal:0,
    varPer:0,
    deliveryCharges:0,
    extraAmount:0,
}
let cartEmpty={
  items:[],
  printiingCompany:{
  },
  total:0,
  servicesSharges:0,
  subTotal:0,
  varPer:0,
  deliveryCharges:0,
  extraAmount:0,

}


export const cartReducer = (state = cart, action) => {
    switch (action.type) {
      case actionMethodes.addItem:
          {
            
           const {item,printing}=action.payload;
            if(action.payload.printing)
            {
              delete printing.password;

            }
            const extraAmmount=parseFloat(item.finishingEffectPrice?item.finishingEffectPrice:0)+parseFloat(item.typeOfprocessingPrice?item.typeOfprocessingPrice:0)+parseFloat(item.materialPrice?item.materialPrice:0)+parseFloat(item.finishingPrice?item.finishingPrice:0);
            state.extraAmount+=parseFloat(extraAmmount*item.quantity); state.items.push(item);
            state.total=parseFloat(state.total)+parseFloat(item.purchaseAmount*item.quantity);
            state.subTotal=state.total+state.extraAmount;
            state.printiingCompany=printing;
            const obj={
              ...state
            }

        return obj;
            
            }
        
      case actionMethodes.removeItem:
        {
            let foundObj=state.items.find(x=>x.id==action.payload.id);            
            let filterd=state.items.filter(x=>x.id!=action.payload.id);
            console.log(foundObj);
            state.items=filterd;
            if(foundObj)
            {
              let total=(parseFloat(foundObj.purchaseAmount))*foundObj.quantity;

            let extraAmount=(parseFloat(foundObj.finishingEffectPrice?foundObj.finishingEffectPrice:0)+parseFloat(foundObj.finishingPrice?foundObj.finishingPrice:0)+parseFloat(foundObj.materialPrice?foundObj.materialPrice:0)+parseFloat(foundObj.typeOfprocessingPrice?foundObj.typeOfprocessingPrice:0))*foundObj.quantity
            state.total-=total;
            state.subTotal-=extraAmount+total;
            state.extraAmount-=extraAmount;
            }

            //  state.items=cart.items.filter(x=>x.id!=action.payload.id);   
            let finalObj={
                ...state
            }
            return finalObj
       
        }

        case actionMethodes.incDec:
        {

          const {id}=action.payload;
          const obj=state.items.find(x=>x.id===id);
          if(obj)
          {
           switch(action.payload.type)
           {
             case 'inc':{
              const extraAmount=parseFloat(obj.finishingEffectPrice?obj.finishingEffectPrice:0)+parseFloat(obj.typeOfprocessingPrice?obj.typeOfprocessingPrice:0)+parseFloat(obj.materialPrice?obj.materialPrice:0)+parseFloat(obj.finishingPrice?obj.finishingPrice:0);
             
              obj.quantity+=1;
              obj.total+=parseFloat(obj.purchaseAmount);
              state.total+=parseFloat(obj.purchaseAmount);
              state.subTotal+=parseFloat(obj.purchaseAmount)+parseFloat(extraAmount);
              state.extraAmount+=parseFloat(extraAmount)
              return {...state};
             }
             case 'dec':{
                if(obj.quantity>1)
                {
                  const extraAmount=parseFloat(obj.finishingEffectPrice?obj.finishingEffectPrice:0)+parseFloat(obj.typeOfprocessingPrice?obj.typeOfprocessingPrice:0)+parseFloat(obj.materialPrice?obj.materialPrice:0)+parseFloat(obj.finishingPrice?obj.finishingPrice:0);

                  obj.quantity-=1;
              obj.total-=parseFloat(obj.purchaseAmount);
              state.total-=parseFloat(obj.purchaseAmount);
              state.subTotal-=parseFloat(obj.purchaseAmount)+parseFloat(extraAmount);
              state.extraAmount-=parseFloat(extraAmount)

              return {...state};
                }
                else
                {
                }

             }
             return {...state};

            
           }
          }
        }

        case "cartempty":
          {
            
              return {...cartEmpty}
          }
        case "freeShipping":
            {
              if(action.payload.type==0)
              {
               if(state.deliveryCharges==0)
               {
                if(state.printiingCompany.premiumshipping)
                {
              
                }
               }
               else
               {
                state.subTotal-=parseFloat(state.deliveryCharges);
                state.deliveryCharges-=parseFloat(state.deliveryCharges);
               }
              }
              else if(action.payload.type==1)
              {
                if(state.deliveryCharges==0)
                {
                  if(state.printiingCompany.premiumshipping)
                  {
                    state.subTotal+=parseFloat(state.printiingCompany.premiumshipping);
                    state.deliveryCharges=parseFloat(state.printiingCompany.premiumshipping);
                    
                  }
                  }

              }
             
                return {...state}
            }
      default:
        return state
    }
  }


  
    export const actions = {
       
       
      };
      
      export function* saga() {
      
       }


  