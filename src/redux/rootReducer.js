import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import * as cart from './reducers/cartReducer'
import {printingReducer} from './reducers/prinitngs';
import * as Authreducer from './reducers/authReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
export const rootReducer = combineReducers({
  auth: Authreducer.Authreducer,
  //customers: customersSlice.reducer,
  printing:printingReducer,
  cart:cart.cartReducer
});
const persistConfig={
  key:'root',
  storage,
  whitelist:['auth','cart']
}

export default persistReducer(persistConfig,rootReducer )

export function* rootSaga() {

}
