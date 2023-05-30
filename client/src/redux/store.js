import { configureStore } from "@reduxjs/toolkit";

const reducer = (state = {}, action) => {
  return state;
};

const store = configureStore({
  reducer: reducer,
});

export default store;