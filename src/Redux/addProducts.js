// Importing createSlice function from Redux Toolkit for creating slices
import { createSlice } from "@reduxjs/toolkit";

// Importing initial product data from the products file
import { myProduct } from "../products";

// Creating a Redux slice for managing product state
export const productSlice = createSlice({
  // Name of the slice
  name: "myProduct",
  
  // Initial state containing product data
  initialState: {
    value: myProduct,
  },
  
  // Reducers define how the state can be modified
  reducers: {
    // Reducer for adding products to the state
    addProducts: (state, action) => {
      // Logging the action for debugging purposes
      console.log(action);

      // Checking if the payload exists before adding to the state
      if (action.payload) {
        state.value.push(action.payload);
      }
    }
  }
});

// Extracting action creators from the slice
export const { addProducts } = productSlice.actions;

// Exporting the reducer function generated by createSlice
export default productSlice.reducer;