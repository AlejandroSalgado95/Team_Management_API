import axiosConfig from '../api_calls/axiosConfig';

export const addTask = (task) => ({
  type: 'ADD_TASK',
  task 
});

export const errorAddTask = (error) => ({
  type: 'ERROR_ADD_TASK',
  error
});

export const loadingTask = () => ({
  type: 'LOADING_TASK'
});

export const startAddTask= (taskData = {}) => {
  return (dispatch) => {
    const {
      id = undefined
    } = taskData;

    dispatch(loadingTask());

    axiosConfig.get(`/api/tasks/${id}`)
    .then(function (response) {
      console.log(response);
      const task = response.data;
      dispatch( addTask(task));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong loading the task"
      dispatch(errorAddTask(errorMessage) );

    });

      

  };
};

