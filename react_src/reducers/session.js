
const sessionDefaultState = {
                              loadingSession : true,
                              hasSession : undefined,
                              profile: {},
                              modal: undefined
                            };

export default (state = sessionDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SESSION':
      return {
        hasSession : true,
        loadingSession : undefined,
        profile: action.profile,
        modal:undefined
      };
    case 'EDIT_SESSION_PROFILE':
      return{
        ...state,
        profile:{
          ...state.profile,
          ...action.profile
        }
      } 
    case 'NOT_LOADING_SESSION':
      return {
        ...state,
        loadingSession : undefined
      }
    case 'LOADING_SESSION':
      return {
        ...state,
        loadingSession : true
      }
    case 'DELETE_SESSION':
      return {
        hasSession : undefined,
        loadingSession: true,
        profile: {},
        modal: undefined
      };
    case 'SET_MODAL':
      return{
        ...state,
        modal: action.modal
      }
    case 'RESET_MODAL':
      return{
        ...state,
        modal: undefined
      }

    default:
      return state;
  }
};