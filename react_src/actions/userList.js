import axiosConfig from '../api_calls/axiosConfig';
import {editSessionProfile} from './session'

export const resetModal = () => ({
  type: 'RESET_MODAL'
});

export const setModal = (modalMessage) => ({
  type: 'SET_MODAL',
  modalMessage
});

export const loadingUserList = () => ({
  type: 'LOADING_USERLIST'
});


//READ

export const addUserList = ({userList,profileId}) => ({
  type: 'ADD_USERLIST',
  userList,
  profileId
});

/*
export const errorOccured = (error) => ({
  type: 'ERROR_OCURRED',
  error
});
*/

export const startAddUserList = (profileId) => {
  return (dispatch) => {

    dispatch(loadingUserList());

    axiosConfig.get('/api/users')
    .then(function (response) {
      console.log(response);
      dispatch( addUserList({userList:response.data,profileId}));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while loading the user list"
      dispatch(setModal(errorMessage) );

    });
      

  };
};



//CREATE

export const addUserToUserList = (user) => ({
  type: 'ADD_USER_TO_USERLIST',
  user
});

export const startAddUserToUserList = (user) => {
  return (dispatch) => {

    dispatch(loadingUserList());

    axiosConfig.post('/api/users/register',user)
    .then(function (response) {
      console.log(response);
      let successMessage = "Added user successfully"
      dispatch( addUserToUserList(response.data));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else if (error == "Error: Request failed with status code 400")
        errorMessage = "The provided account already exists!"
      else
        errorMessage = "something went wrong while creating the user"
      dispatch(setModal(errorMessage) );

    });
      

  };
};


//UPDATE

export const editUserFromUserList = (user) => ({
  type: 'EDIT_USER_FROM_USERLIST',
  user
});

export const startEditUserFromUserList = (user) => {
  return (dispatch) => {

    dispatch(loadingUserList());

    axiosConfig.put(`/api/users/${user._id}`,user)
    .then(function (response) {
      console.log(response);
      let successMessage = "Updated user successfully"
      if (user.isProfile)
        dispatch( editSessionProfile(response.data));
      else
        dispatch( editUserFromUserList(response.data));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while updating the user"
      dispatch(setModal(errorMessage) );

    });
      

  };
};



//DELETE
export const removeUserFromUserList = (id) => ({
  type: 'REMOVE_USER_FROM_USERLIST',
  id
});

export const startRemoveUserFromUserList = (id) => {
  return (dispatch) => {

    dispatch(loadingUserList());

    axiosConfig.delete(`/api/users/${id}`,{})
    .then(function (response) {
      console.log(response);
      let successMessage = "Deleted user successfully";
      dispatch( removeUserFromUserList(id));
      dispatch(setModal(successMessage));

    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while deleting the user"
      dispatch(setModal(errorMessage) );

    });
      

  };
};

