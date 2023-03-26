const { configureStore, createSlice } = require('@reduxjs/toolkit');
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const initialState = {};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

const { getData } = slice.actions;
const dateReducers = slice.reducer;

const fetchDataMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    const { dispatch, getState } = store;
    action(getState, dispatch);
    next({ type: getData().type, payload: { data: [] } });
  } else next(action);
};

const store = configureStore({
  reducer: dateReducers,
  middleware: [fetchDataMiddleware],
});

const fetchData = async (state, dispatch) => {
  console.log(state, dispatch);
};

store.dispatch(fetchData);
console.log(store.getState());
