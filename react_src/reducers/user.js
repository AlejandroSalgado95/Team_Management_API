
const UserReducerDefaultState = { loadingUser : false,
                                    loadingTasks : false,
                                     account : undefined,
                                     id : undefined ,
                                     name: undefined,
                                     role: undefined,
                                     user_type: undefined,
                                     errorUser : undefined,
                                     errorTasks: undefined,
                                     tasks:[]
                                    };

export default (state = UserReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      const {account, id,name,role,user_type} = action.user
      return {
        ...state,
        loadingUser: false,
        errorUser : undefined,
        account,
        id,
        name,
        role,
        user_type
      };
    case 'LOADING_USER':
      return {
        ...state,
        loadingUser: true,
        errorUser:undefined
      };
    case 'ERROR_ADD_USER':
      return {
        ...state,
        loadingUser : false,
        errorUser : action.error,
        account : undefined,
        id : undefined,
        name:undefined,
        role:undefined,
        user_type:undefined
      };
    case 'ADD_TASKS':
      return {
        ...state,
        loadingTasks : false,
        tasks : action.tasks,
        errorTasks: undefined
      };
      case 'LOADING_TASKS':
      return {
        ...state,
        loadingTasks : true,
        errorTasks:undefined,
        tasks:[]
      };
      case 'ERROR_ADD_TASKS':
      return {
        ...state,
        errorTasks: action.error,
        loadingTasks : false,
        tasks: []
      };



      /*
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        };
      });*/
    default:
      return state;
  }
};