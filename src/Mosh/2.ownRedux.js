const reducer = (state = { val: 0 }, action) => {
  switch (action.type) {
    case 'inc':
      return { ...state, val: state.val + 1 };
    default:
      return state;
  }
};

function createStore(reducer) {
  let state;
  let listenrs = [];
  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listenrs && listenrs.forEach((listenr) => listenr());
    },
    subscribe(callback) {
      listenrs.push(callback);
    },
  };
}

const store = createStore(reducer);
store.subscribe(() => console.log('store updated', store.getState()));
store.dispatch({ type: 'inc' });
store.dispatch({ type: 'inc' });
store.dispatch({ type: 'inc' });
