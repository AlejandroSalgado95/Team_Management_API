import axiosConfig from '../api_calls/axiosConfig';

export const addTaskList = (taskList) => ({
  type: 'ADD_TASKLIST',
  taskList
});

export const errorAddTaskList = (error) => ({
  type: 'ERROR_ADD_TASKLIST',
  error
});

export const loadingTaskList = () => ({
  type: 'LOADING_TASKLIST'
});

export const startAddTaskList = () => {
  return (dispatch) => {

    dispatch(loadingTaskList());

    axiosConfig.get('/api/tasks')
    .then(function (response) {
      console.log(response);
      dispatch( addTaskList(response.data));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong loading the Task list"
      dispatch(errorAddTaskList(errorMessage) );

    });
      

  };
};
