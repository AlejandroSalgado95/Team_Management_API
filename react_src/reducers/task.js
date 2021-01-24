
const TaskReducerDefaultState = {
                                      loadingTask : false,
                                      loadingTaskComments: false,
                                      /*errorTask: undefined,*/
                                      id: undefined,
                                      name: undefined,
                                      description:undefined,
                                      createdByUser: {},
                                      creationDate: '',
                                      assignedToUser:{},
                                      status:undefined,
                                      taskComments:[],
                                      modal: undefined
                                };

export default (state = TaskReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const  {_id : id, name,description,createdByUser,creationDate,assignedToUser,status,taskComments} = action.task;
      return {
        ...state,
        loadingTaskComments: false,
        loadingTask: false,
        /*errorTask:undefined,*/
        id,
        name,
        description,
        createdByUser,
        creationDate,
        assignedToUser,
        status,
        taskComments
      };
    case 'ADD_TASKCOMMENT_TO_TASK':
      const newTaskComment = [action.taskComment];

      return {
        ...state,
        loadingTaskComments: false,
        taskComments: state.taskComments.concat(newTaskComment)
      };
    case 'LOADING_TASK':
      return {
        ...state,
        loadingTask: true,
        loadingTaskComments: false,
        /*errorTask: undefined,*/
        id:undefined,
        name: undefined,
        createdByUser: {},
        creationDate: '',
        assignedToUser:{},
        status:undefined,
        taskComments:[]

      };
    case 'LOADING_TASKCOMMENTS':
      return {
        ...state,
        loadingTaskComments: true
      };

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

      /*
    case 'ERROR_ADD_TASK':
      return {
        loadingTask: false,
        errorTask: action.error,
        id:undefined,
        name: undefined,
        createdByUser: {},
        creationDate: '',
        assignedToUser:{},
        status:undefined,
        taskComments:[]
      };*/
    default:
      return state;
  }
};