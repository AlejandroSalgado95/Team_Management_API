
const UserListReducerDefaultState = {
                                      loadingUserList : false,
                                      users:[],
                                      error: undefined
                                    };

export default (state = UserListReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USERLIST':

      const profileId = sessionStorage.getItem('profileId');
      return {
        loadingUserList: false,
        users: action.userList.filter((user)=>user._id!=profileId),
        error:undefined
      };
    case 'LOADING_USERLIST':
      return {
        loadingUserList: true,
        users: [],
        error: undefined
      };
    case 'ERROR_ADD_USERLIST':
      return {
        loadingUserList: false,
        users: [],
        error: action.error
      };
    default:
      return state;
  }
};