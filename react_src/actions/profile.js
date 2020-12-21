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

    axiosConfig.post('/login', {
      account,
      password
    })
    .then(function (response) {
      console.log(response);
      const {account , id } = response;
      dispatch( addProfile({account,id}));

    })
    .catch(function (error) {
      console.log(error);
      dispatch(errorAddProfile(error) );

    });
      

  };
};
