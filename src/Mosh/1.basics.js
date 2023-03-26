import { createStore } from 'redux';

const bugInitialState = [];

let lastId = 0;

const bugAdded = 'bug/added';
const bugRemoved = 'bug/removed';
const bugGetIds = 'bug/getIds';

const bugAddedActionCreator = (description) => ({
  type: bugAdded,
  payload: { description },
});

const bugRemovedActionCreator = (id) => ({ type: bugRemoved, payload: { id } });

const bugGetIdsActionCreator = () => ({ type: bugGetIds });

const bugReducer = (state = bugInitialState, action) => {
  switch (action.type) {
    case bugAdded:
      return [
        ...state,
        { description: action.payload.description, id: ++lastId },
      ];
    case bugRemoved:
      return state.filter((bug) => bug.id !== action.payload.id);
    case bugGetIds:
      return state.map((bug) => bug.id);
    default:
      return state;
  }
};

const store = createStore(bugReducer);
store.subscribe(() => console.log('store updated ', store.getState()));

store.dispatch(bugAddedActionCreator('This is the first bug'));
store.dispatch(bugAddedActionCreator('This is the second bug'));
store.dispatch(bugRemovedActionCreator(1));
store.dispatch(bugGetIdsActionCreator());
