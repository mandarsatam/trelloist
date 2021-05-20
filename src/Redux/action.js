import { GET_TASK, UPDATE_TASK, DELETE_TASK, GET_SUBTASK, ADD_SUBTASK, UPDATE_SUBTASK } from "./actionType"
import { ADD_TASK } from "./actionType"
import { ADD_LIST, GET_LIST, UPDATE_LIST, DELETE_LIST } from "./actionType";

import axios from "axios"

// MongoDB Actions
const getListSuccess = (payload) => {
    return {
        type: GET_LIST,
        payload
    }
}

const getList = (payload) => (dispatch) => {
    return axios
        .get(`https://trelloistbackend.herokuapp.com/lists/${payload.boardId}`)
        .then(res => {
            dispatch(getListSuccess(res.data.data))
        })
        .catch(err => console.log(err))
}

const addListSuccess = (payload) => {
    return {
        type: ADD_LIST,
        payload
    }
}

const addList = (payload) => (dispatch) => {
    return axios
        .post("https://trelloistbackend.herokuapp.com/lists", payload)
        .then(res => {
            dispatch(addListSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}

const updateListSuccess = (payload) => {
    return {
        type: UPDATE_LIST,
        payload
    }
}

const updateList = (payload) => (dispatch) => {
    return axios
        .patch("https://trelloistbackend.herokuapp.com/lists", payload)
        .then(res => {
            dispatch(updateListSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}

const deleteListSuccess = (payload) => {
    return {
        type: DELETE_LIST,
        payload
    }
}

const deleteList = (payload) => (dispatch) => {
    return axios
        .delete("https://trelloistbackend.herokuapp.com/lists", { data: payload })
        .then(res => {
            dispatch(deleteListSuccess(payload));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}



//Actions for Tasks

const getTaskSuccess = (payload) => {
    return {
        type: GET_TASK,
        payload
    }
}

const getTask = (payload) => (dispatch) => {
    return axios
        .get(`https://trelloistbackend.herokuapp.com/task/${payload.boardId}`)
        .then(res => {
            dispatch(getTaskSuccess(res.data.data))
        })
        .catch(err => console.log(err))
}


const addTaskSuccess = (payload) => {
    return {
        type: ADD_TASK,
        payload
    }
}

const addTask = (payload) => (dispatch) => {
    return axios
        .post("https://trelloistbackend.herokuapp.com/task/", payload)
        .then(res => {
            dispatch(addTaskSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}

const updateTaskSuccess = (payload) => {
    return {
        type: UPDATE_TASK,
        payload
    }
}

const updateTask = (payload) => (dispatch) => {
    return axios
        .patch("https://trelloistbackend.herokuapp.com/task", payload)
        .then(res => {
            dispatch(updateTaskSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}


const deleteTaskSuccess = (payload) => {
    return {
        type: DELETE_TASK,
        payload
    }
}

const deleteTask = (payload) => (dispatch) => {
    return axios
        .delete("https://trelloistbackend.herokuapp.com/task", { data: payload })
        .then(res => {
            dispatch(deleteTaskSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}


//Actions for subTasks


const getSubTaskSuccess = (payload) => {
    return {
        type: GET_SUBTASK,
        payload
    }
}

const getSubTask = (payload) => (dispatch) => {
    return axios
        .get(`https://trelloistbackend.herokuapp.com/subTask/${payload.boardId}`)
        .then(res => {
            dispatch(getSubTaskSuccess(res.data.data))
        })
        .catch(err => console.log(err))
}


const addSubTaskSuccess = (payload) => {
    return {
        type: ADD_SUBTASK,
        payload
    }
}

const addSubTask = (payload) => (dispatch) => {
    return axios
        .post("https://trelloistbackend.herokuapp.com/subTask/", payload)
        .then(res => {
            dispatch(addSubTaskSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}

const updateSubTaskSuccess = (payload) => {
    return {
        type: UPDATE_SUBTASK,
        payload
    }
}

const updateSubTask = (payload) => (dispatch) => {
    return axios
        .patch("https://trelloistbackend.herokuapp.com/subTask", payload)
        .then(res => {
            dispatch(updateSubTaskSuccess(res.data.data));
            return {
                success: true
            }
        })
        .catch(err => console.log(err))
}


// const deleteTaskSuccess = (payload) =>{
//     return {
//         type: DELETE_TASK,
//         payload
//     }
// }

// const deleteTask = (payload) => (dispatch) =>{
//     return axios
//     .delete("https://trelloistbackend.herokuapp.com/task", {data: payload})
//     .then(res => {
//         console.log(res);
//         dispatch(deleteTaskSuccess(res.data.data));
//         return {
//             success: true
//         }
//     })
//     .catch(err => console.log(err))
// }

export { getList, addList, updateList, deleteList, getTask, addTask, updateTask, deleteTask, getSubTask, addSubTask, updateSubTask, }


