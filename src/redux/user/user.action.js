import userActionTypes from "./user.types";

export const setCurrentUser = (loginData) => ({
    type:userActionTypes.SET_CURRENT_USER,
    payload:loginData
})

export const setDropdownUser = (users) => ({
    type:userActionTypes.SET_DROPDOWN_USERS,
    payload:users
})
export const setUserId = (userId) => ({
    type:userActionTypes.SET_USER_ID,
    payload:userId
})