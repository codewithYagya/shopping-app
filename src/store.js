// Importing necessary functions and libraries for Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import cartReducer from './Redux/CartSlice'
import productReducer from './Redux/addProducts'

// Combining multiple reducers into a single root reducer
const reducers = combineReducers({
  cartDetail: cartReducer,
  productDetail: productReducer
})

// Configuration for persisting Redux state in local storage
const persistConfig = {
  key: 'root',
  storage,
}

// Creating a persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, reducers)

// Configuring the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production' // Allowing Redux DevTools only in development mode
})

// Exporting the configured Redux store
export default store;
