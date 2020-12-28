
const UserListReducerDefaultState = {
                                      loadingUserList : false,
                                      users:[],
                                      /*error: undefined,*/
                                      modal: undefined
                                    };

export default (state = UserListReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USERLIST':
      //const profileId = sessionStorage.getItem('profileId');
      return {
        ...state,
        loadingUserList: false,
       // users: action.userList.filter((user)=>user._id!=profileId),
        users:action.userList.filter(()=>true),
        //error:undefined
      };
    case 'ADD_USER_TO_USERLIST':
      const newUser = [action.user];
      return {
        ...state,
        loadingUserList: false,
        users: state.users.concat(newUser),
        //error:undefined
      };
    case 'EDIT_USER_FROM_USERLIST':
      return {
        ...state,
        loadingUserList: false,
        users: state.users.map((user) => {
        if (user._id === action.user._id) {
          return {
            ...user,
            ...action.user
          };
        } else {
          return user;
        }
      })
    };
    case 'LOADING_USERLIST':
      return {
        ...state,
        loadingUserList: true
        //error: undefined,
      };
    /*case 'ERROR_OCURRED':
      return {
        ...state,
        loadingUserList: false,
        users: [],
        error: action.error,
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
    }
    default:
      return state;
  }
};