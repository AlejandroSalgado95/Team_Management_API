
const messageListReducerDefaultState = {
                                      loadingMessageList : false,
                                      messages:[],
                                      /*error: undefined*/
                                      modal:undefined
                                    };

export default (state = messageListReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGELIST':
      return {
        ...state,
        loadingMessageList: false,
        messages: action.messages.reverse().concat(state.messages)
      };
    case 'ADD_MESSAGE_TO_MESSAGELIST':
      const newMessage = [action.message];
      return {
        ...state,
        loadingMessageList: false,
        messages: state.messages.concat(newMessage)
      };
    
    case 'LOADING_MESSAGELIST':
      return {
        ...state,
        loadingMessageList: true
      };

    case 'RESET_MODAL':
      return{
        ...state,
        modal:undefined
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.modalMessage
      };
    case 'RESET_STATE_TO_DEFAULT':
        return{
            ...state,
            ...messageListReducerDefaultState
       } 

    default:
      return state;
  }
};