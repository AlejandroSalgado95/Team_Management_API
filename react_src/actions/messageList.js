import axiosConfig from '../api_calls/axiosConfig';


export const resetModal = () => ({
  type: 'RESET_MODAL'
});

export const setModal = (modalMessage) => ({
  type: 'SET_MODAL',
  modalMessage
});

export const loadingMessageList = () => ({
  type: 'LOADING_MESSAGELIST'
});

export const resetStateToDefault = () => ({
  type: 'RESET_STATE_TO_DEFAULT'
});




//READ

export const addMessageList = (messages) => ({
  type: 'ADD_MESSAGELIST',
  messages
});


export const startAddMessageList = (lastMessageId) => {
  return (dispatch) => {

    dispatch(loadingMessageList());
    let url = undefined;

    if (lastMessageId)
      url =`/api/messages/?last_message_id=${lastMessageId}`;
    else
      url ='/api/messages/';

    axiosConfig.get(url)
    .then(function (response) {
      console.log(response);
      dispatch( addMessageList(response.data));
    })
    .catch(function (error) {
      console.log(error);
      let errorMessage;
      if (error == "Error: Request failed with status code 403")
        errorMessage = "Unauthorized content. No session id provided."
      else
        errorMessage = "something went wrong while loading the messages "
      dispatch(setModal(errorMessage) );

    });
      

  };
};

