import axiosConfig from '../api_calls/axiosConfig';
// ADD_EXPENSE
export const addProfile = (profile) => ({
  type: 'ADD_PROFILE',
  profile
});

export const errorAddProfile = (error) => ({
  type: 'ERROR_ADD_PROFILE',
  error
});

export const loadingProfile = () => ({
  type: 'LOADING_PROFILE'
});

export const startAddProfile = (profileData = {}) => {
  return (dispatch) => {
    const {
      account = '',
      password = '',
    } = profileData;

    dispatch(loadingProfile());

    axiosConfig.post('/api/login', {
      account,
      password
    })
    .then(function (response) {
      console.log(response);
      const {account , _id, name, role, user_type} = response.data.userinfo;
      const id = _id
      dispatch( addProfile({account,id,name,role,user_type}));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage
      if (error == "Error: Request failed with status code 404")
        errorMessage = "Wrong credentials"
      dispatch(errorAddProfile(errorMessage) );

    });
      

  };
};
