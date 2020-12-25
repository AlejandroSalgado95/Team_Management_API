
const TaskReducerDefaultState = {
                                      loadingTask : false,
                                      errorTask: undefined,
                                      id: undefined,
                                      name: undefined,
                                      createdByUser: {},
                                      creationDate: '',
                                      assignedToUser:{},
                                      status:undefined,
                                      taskComments:[]
                                };

export default (state = TaskReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const  {_id : id, name,createdByUser,creationDate,assignedToUser,status,taskComments} = action.task;
      return {
        loadingTask: false,
        errorTask:undefined,
        id,
        name,
        createdByUser,
        creationDate,
        assignedToUser,
        status,
        taskComments
      };
    case 'LOADING_TASK':
      return {
        loadingTask: true,
        errorTask: undefined,
        id:undefined,
        name: undefined,
        createdByUser: {},
        creationDate: '',
        assignedToUser:{},
        status:undefined,
        taskComments:[]

      };
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
      };
    default:
      return state;
  }
};