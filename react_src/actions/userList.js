import axiosConfig from '../api_calls/axiosConfig';

export const addUserList = (userList) => ({
  type: 'ADD_USERLIST',
  userList
});

export const errorAddUserList = (error) => ({
  type: 'ERROR_ADD_USERLIST',
  error
});

export const loadingUserList = () => ({
  type: 'LOADING_USERLIST'
});

export const startAddUserList = () => {
  return (dispatch) => {

    dispatch(loadingUserList());

    axiosConfig.get('/api/users')
    .then(function (response) {
      console.log(response);
      dispatch( addUserList(response.data));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong loading the user list"
      dispatch(errorAddUserList(errorMessage) );

    });
      

  };
};
