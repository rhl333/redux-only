const {
  createSlice,
  configureStore,
  createSelector,
} = require('@reduxjs/toolkit');

// middleware functions run before the reducer function. if we do not call the next function then the execution will not go further

const initialState = [];
let lastId = 0;
const slice = createSlice({
  name: 'bug',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push({ id: ++lastId, desc: action.payload.desc });
    },
    remove: (state, action) => {
      return state.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const { add, remove } = slice.actions;
const reducer = slice.reducer;

const logger = (store) => (next) => (action) => {
  next(action);
};

const parameterizedLogger = (param) => (store) => (next) => (action) => {
  next(action);
};

const bugsSelector = (state) => state;
const memoizedBugSelector = createSelector(bugsSelector, (bugs) => bugs);

const store = configureStore({
  reducer,
  middleware: [
    logger,
    parameterizedLogger('this is the parameterized middleware'),
  ],
});

store.subscribe(() => console.log('store updated', store.getState()));

// when we dispatch any action the execution will look like this
// logger ==> parameterizedLogger ==> reducer
// the next function for the logger function wiil be the parameterizedLogger function.
// the next function for parameterizedLogger will the reducer function.
// if next function will not be called then it won't execute further.

store.dispatch(add({ desc: 'this is the first bug that i am adding' }));

const bugs = memoizedBugSelector(store.getState());
const bugs2 = memoizedBugSelector(store.getState());

console.log(bugs === bugs2); // true, since we are using createSelector. it will return the cached value.
