import { createStore, combineReducers } from 'redux';

// number actions
const INC = 'INC';
const DEC = 'DEC';

// cake actions
const ORDER = 'ORDER';
const MAKE = 'MAKE';

// initial states
const initialNumberState = { number: 0 };
const initiaCakeState = { cakes: 0 };

// action creators
const incAction = () => {
  return { type: INC, payload: 100 };
};

const decAction = () => {
  return { type: DEC, payload: 20 };
};

const orderAction = () => {
  return { type: ORDER };
};

const makeAction = () => {
  return { type: MAKE };
};

// reducers
const numberReducer = (state = initialNumberState, action) => {
  switch (action.type) {
    case INC:
      return { ...state, number: state.number + action.payload };
    case DEC:
      return { ...state, number: state.number - action.payload };
    default:
      return state;
  }
};

const cakeReducer = (state = initiaCakeState, action) => {
  switch (action.type) {
    case ORDER:
      return {
        ...state,
        cakes: state.cakes <= 0 ? 0 : state.cakes - 1,
      };
    case MAKE:
      return { ...state, cakes: state.cakes + 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  number: numberReducer,
  cakes: cakeReducer,
});

const store = createStore(rootReducer);
store.subscribe(() => console.log('store updated ===>', store.getState()));

store.dispatch(incAction());
store.dispatch(decAction());
store.dispatch(orderAction());
store.dispatch(makeAction());
