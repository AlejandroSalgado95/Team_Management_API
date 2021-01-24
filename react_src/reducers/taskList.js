
const TaskListReducerDefaultState = {
                                      loadingTaskList : false,
                                      tasks:[],
                                      /*error: undefined*/
                                      modal:undefined
                                    };

export default (state = TaskListReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASKLIST':
      return {
        loadingTaskList: false,
        tasks: action.taskList.filter(()=>true)/*,
        error:undefined*/
      };
    case 'ADD_TASK_TO_TASKLIST':
      const newTask = [action.task];
      return {
        ...state,
        loadingTaskList: false,
        tasks: state.tasks.concat(newTask)/*,
        error:undefined*/
      };
    case 'EDIT_TASK_FROM_TASKLIST':
      return {
        ...state,
        loadingUserList: false,
        tasks: state.tasks.map((task) => {
        if (task._id === action.task._id) {
          return {
            ...task,
            ...action.task
          };
        } else {
          return task;
        }
      })
    };
    
    case 'REMOVE_TASK_FROM_TASKLIST':
      return {
          ...state,
          loadingTaskList: false,
          tasks:  state.tasks.filter(({ _id }) => _id !== action.id)
      };
    
    case 'LOADING_TASKLIST':
      return {
        ...state,
        loadingTaskList: true/*,
        error: undefined*/
      };


      /*
    case 'ERROR_ADD_TASKLIST':
      return {
        loadingTaskList: false,
        tasks: [],
        error: action.error
      };*/
    case 'RESET_MODAL':
      return{
        ...state,
        modal:undefined
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.modalMessage
      };

    default:
      return state;
  }
};