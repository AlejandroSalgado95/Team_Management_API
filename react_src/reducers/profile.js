
const profileReducerDefaultState = { loading : false,
                                     account : undefined,
                                     id : undefined ,
                                     error : undefined
                                    };

export default (state = profileReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROFILE':
      const {account, id} = action.profile
      return {
        ...state,
        loading : false,
        error : undefined,
        account,
        id
      };
    case 'LOADING_PROFILE':
      return {
        ...state,
        loading : true,
      };
    case 'ERROR_ADD_PROFILE':
      return {
        ...state,
        loading : false,
        error : action.error,
        account : undefined,
        id : undefined
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