import axiosConfig from '../api_calls/axiosConfig';

export const resetModal = () => ({
  type: 'RESET_MODAL'
});

export const setModal = (modalMessage) => ({
  type: 'SET_MODAL',
  modalMessage
});


export const loadingTask = () => ({
  type: 'LOADING_TASK'
});

export const loadingTaskComments = () => ({
  type: 'LOADING_TASKCOMMENTS'
});


/*
export const errorAddTask = (error) => ({
  type: 'ERROR_ADD_TASK',
  error
});*/


export const addTask = (task) => ({
  type: 'ADD_TASK',
  task 
});

export const startAddTask= (taskData = {}) => {
  return (dispatch) => {
    const {
      id = undefined
    } = taskData;

    dispatch(loadingTask());
    dispatch(loadingTaskComments());

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


export const addTaskCommentToTask = (taskComment) => ({
  type: 'ADD_TASKCOMMENT_TO_TASK',
  taskComment
});

export const startAddTaskCommentToTask= (taskCommentData = {}) => {
  return (dispatch) => {
    const {
      taskId = undefined,
      content = undefined
    } = taskCommentData;

    dispatch(loadingTaskComments());

    axiosConfig.post(`api/tasks/${taskId}/comments`,{content})
    .then(function (response) {
      console.log(response);
      const taskComment = response.data;
      dispatch( addTaskCommentToTask(taskComment));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong adding the comment"
      dispatch(setModal(errorMessage) );

    });

      

  };
};


