import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from '../reducers/user';
import taskReducer from '../reducers/task';
import userListReducer from '../reducers/userList';
import taskListReducer from '../reducers/taskList';
import sessionReducer from '../reducers/session';
import messageListReducer from '../reducers/messageList';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      userList: userListReducer,
      taskList: taskListReducer,
      messageList: messageListReducer,
      actualUser : userReducer,
      actualTask : taskReducer, 
      session : sessionReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
