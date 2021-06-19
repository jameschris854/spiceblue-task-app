import userActionTypes from "./user.types";

const INITIAL_STATE = {
  token: null,
  userProPic: null,
  usersDropdown:null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        userProPic: action.payload.icon,
        token: action.payload.token,
      };
      case userActionTypes.SET_DROPDOWN_USERS:
          return {
              ...state,
              usersDropdown:action.payload
          }
        case userActionTypes.SET_USER_ID:
            return{
                ...state,
                userId:action.payload
            }
    default:
      return state;
  }
};

export default userReducer;
