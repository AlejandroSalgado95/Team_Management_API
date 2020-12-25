
const TaskListReducerDefaultState = {
                                      loadingTaskList : false,
                                      tasks:[],
                                      error: undefined
                                    };

export default (state = TaskListReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASKLIST':
      return {
        loadingTaskList: false,
        tasks: action.taskList.filter(()=>true),
        error:undefined
      };
    case 'LOADING_TASKLIST':
      return {
        loadingTaskList: true,
        tasks: [],
        error: undefined
      };
    case 'ERROR_ADD_TASKLIST':
      return {
        loadingTaskList: false,
        tasks: [],
        error: action.error
      };
    default:
      return state;
  }
};