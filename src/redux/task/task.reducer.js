import taskActionTypes from "./task.types";

const INITIAL_STATE = {allTasks:{}}

const taskReducer = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case taskActionTypes.SET_TASKS_DATA:
            return{
                ...state,
                allTasks:action.payload
            }
        default:
            return state
    }
}

export default taskReducer