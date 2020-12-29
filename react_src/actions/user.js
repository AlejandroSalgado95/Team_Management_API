import axiosConfig from '../api_calls/axiosConfig';

export const addUser = (user) => ({
  type: 'ADD_USER',
  user
});

export const errorAddUser = (error) => ({
  type: 'ERROR_ADD_USER',
  error
});

export const loadingUser = () => ({
  type: 'LOADING_USER'
});


export const startAddUserById = (userData = {}) => {
  return (dispatch) => {
    const {
      id = undefined
    } = userData;

    dispatch(loadingUser());

    axiosConfig.get(`/api/users/${id}`)
    .then(function (response) {
      console.log(response);
      const {account , _id, name, role, user_type} = response.data;
      const id = _id
      dispatch( addUser({account,id,name,role,user_type}));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong loading the user"

      dispatch(errorAddUser(errorMessage) );

    });
  }
}


export const addTasks = (tasks) => ({
  type: 'ADD_TASKS',
  tasks 
});

export const errorAddTasks = (error) => ({
  type: 'ERROR_ADD_TASKS',
  error
});

export const loadingTasks = () => ({
  type: 'LOADING_TASKS'
});

export const startAddTasksOfUser = (userData = {}) => {
  return (dispatch) => {
    const {
      id = undefined
    } = userData;

    dispatch(loadingTasks());

    axiosConfig.get(`/api/users/${id}/tasks`)
    .then(function (response) {
      console.log(response);
      const tasks = response.data;
      dispatch( addTasks(tasks));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong loading the tasks"
      dispatch(errorAddTasks(errorMessage) );

    });

      

  };
};

