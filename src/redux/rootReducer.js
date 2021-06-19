import { combineReducers } from "redux";
import taskReducer from "./task/task.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    user:userReducer,
    tasks:taskReducer
})

export default rootReducer;