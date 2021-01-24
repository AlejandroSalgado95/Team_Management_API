import axiosConfig from '../api_calls/axiosConfig';


export const resetModal = () => ({
  type: 'RESET_MODAL'
});

export const setModal = (modalMessage) => ({
  type: 'SET_MODAL',
  modalMessage
});

export const loadingTaskList = () => ({
  type: 'LOADING_TASKLIST'
});


export const errorAddTaskList = (error) => ({
  type: 'ERROR_ADD_TASKLIST',
  error
});


//READ

export const addTaskList = (taskList) => ({
  type: 'ADD_TASKLIST',
  taskList
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
      dispatch(setModal(errorMessage) );

    });
      

  };
};



//CREATE

export const addTaskToTaskList = (task) => ({
  type: 'ADD_TASK_TO_TASKLIST',
  task
});

export const startAddTaskToTaskList = (task) => {
  return (dispatch) => {

    dispatch(loadingTaskList());
    console.log("task to be saved:",task);
    axiosConfig.post('/api/tasks',task)
    .then(function (response) {
      console.log(response);
      let successMessage = "Added task successfully";
      dispatch( addTaskToTaskList(response.data));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while creating the task"
      dispatch(setModal(errorMessage) );

    });
      

  };
};



//UPDATE

export const editTaskFromTaskList = (task) => ({
  type: 'EDIT_TASK_FROM_TASKLIST',
  task
});

export const startEditTaskFromTaskList = (task) => {
  return (dispatch) => {

    dispatch(loadingTaskList());

    axiosConfig.put(`/api/tasks/${task._id}`,task)
    .then(function (response) {
      console.log(response);
      let successMessage = "Updated task successfully"
      dispatch( editTaskFromTaskList(response.data));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while updating the task"
      dispatch(setModal(errorMessage) );

    });
      

  };
};


//DELETE
export const removeTaskFromTaskList = (id) => ({
  type: 'REMOVE_TASK_FROM_TASKLIST',
  id
});

export const startRemoveTaskFromTaskList = (id) => {
  return (dispatch) => {

    dispatch(loadingTaskList());

    axiosConfig.delete(`/api/tasks/${id}`,{})
    .then(function (response) {
      console.log(response);
      let successMessage = "Deleted task successfully";
      dispatch( removeTaskFromTaskList(id));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while deleting the task"
      dispatch(setModal(errorMessage) );

    });
      

  };
};





