import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from '../reducers/profile';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      /*userList: userListReducer,
      taskList: taskListReducer,
      messageList: messageListReducer,*/
      profile : profileReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
