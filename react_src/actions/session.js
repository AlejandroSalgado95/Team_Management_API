import axiosConfig from '../api_calls/axiosConfig';


export const setModal = (modal) => ({
  type: 'SET_MODAL',
  modal
});

export const resetModal = () => ({
  type: 'RESET_MODAL'
});




export const addSession = (profile) => ({
  type: 'ADD_SESSION',
  profile
});


export const deleteSession = () => ({
  type: 'DELETE_SESSION'
});


export const notLoadingSession = () => ({
  type: 'NOT_LOADING_SESSION'
});

export const loadingSession = () => ({
  type: 'LOADING_SESSION'
});


export const startAddSessionBySessionId = () => {
  return (dispatch) => {

    const id = localStorage.getItem("profileId");

    axiosConfig.get(`/api/users/${id}`)
    .then(function (response) {
      console.log(response);
      const {account , _id , name, role, user_type} = response.data;
      dispatch( addSession({account,_id,name,role,user_type}));
    })
    .catch(function (error) {
      console.log(error);
      dispatch( notLoadingSession());

    });
  }
}

export const startAddSessionByLogin = (userData = {}) => {
  return (dispatch) => {
    const {
      account = '',
      password = ''
    } = userData;

    dispatch(loadingSession());

    axiosConfig.post('/api/login', {
      account,
      password
    })
    .then(function (response) {
      console.log(response);
      const {account , _id , name, role, user_type} = response.data.userinfo;
      localStorage.setItem('profileId', _id);
      //sessionStorage.setItem('profileId', id);
      //sessionStorage.setItem('profileAccount', account);
      //sessionStorage.setItem('userType',user_type);
      dispatch( addSession({account,_id,name,role,user_type}));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage
      if (error == "Error: Request failed with status code 404")
        errorMessage = "Wrong credentials"
      else 
        errorMessage ="Something went wrong while loggin in"
      dispatch(deleteSession());
      dispatch(setModal(errorMessage) );

    });
      

  };
};

