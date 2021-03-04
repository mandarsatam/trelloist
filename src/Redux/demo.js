import { GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS } from "./actionType"
import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from "./actionType"
import { UPDATE_TODO_FAILURE, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS } from "./actionType"
import { DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS } from "./actionType"
import axios from "axios"

// Get Todo

const getTodoRequest = () =>{
    return {
        type: GET_TODO_REQUEST
    }
}

const getTodoSuccess = (payload) =>{
    return {
        type: GET_TODO_SUCCESS,
        payload
    }
}

const getTodoFailure = (payload) =>{
    return {
        type: GET_TODO_FAILURE,
        payload
    }
}

const getTodo = () => (dispatch) => {
    dispatch(getTodoRequest());
    return axios
    .get("http://localhost:3000/tasks")
    .then(res => dispatch(getTodoSuccess(res.data)))
    .catch(err => getTodoFailure(err))
}

// Add Todo

const addTodoRequest = () =>{
    return {
        type: ADD_TODO_REQUEST
    }
}

const addTodoSuccess = (payload) =>{
    return {
        type: ADD_TODO_SUCCESS,
        payload
    }
}

const addTodoFailure = (payload) =>{
    return {
        type: ADD_TODO_FAILURE,
        payload
    }
}

const addTodo = (payload) => (dispatch) => {
    dispatch(addTodoRequest());
    return axios
    .post("http://localhost:3000/tasks", payload)
    .then(res => {
        dispatch(addTodoSuccess(res.data));
        return {
            success: true
        }
    })
    .catch(err => {
        dispatch(addTodoFailure(err));
    })
    
}

// Update Todo

const updateTodoRequest = () =>{
    return {
        type: UPDATE_TODO_REQUEST,
        
    }
}

const updateTodoSuccess = (payload) =>{
    return {
        type: UPDATE_TODO_SUCCESS,
        payload
    }
}

const updateTodoFailure = (payload) =>{
    return {
        type: UPDATE_TODO_FAILURE,
        payload
    }
}


const updateTodo = (payload, id) => (dispatch) => {
    dispatch(updateTodoRequest());
    if(id === null){
        return axios.patch("http://localhost:3000/tasks", payload)
        .then(res => updateTodoSuccess(res.data))
        .then(getTodo())
        .catch(err => updateTodoFailure(err))
    }else{
        let getData = "";
        console.log(id);
        axios.get(`http://localhost:3000/tasks/${id}`)
        .then(res => {
            getData = res.data;
            getData.subtasks.push(payload);
        })
        .then(() =>{
            let config = {
                method: 'patch',
                url: `http://localhost:3000/tasks/${id}`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : {subtasks : getData.subtasks}
            };
            axios(config)
            .then(res => {
                dispatch(updateTodoSuccess({...res.data, id}));
                return {
                    success: true
                }
            })
            .catch(err => {
                dispatch(updateTodoFailure(err));
            })
        })
    }

}


// Delete Todo

const deleteTodoRequest = () =>{
    return {
        type: DELETE_TODO_REQUEST
    }
}

const deleteTodoSuccess = (payload) =>{
    return {
        type: DELETE_TODO_SUCCESS,
        payload
    }
}

const deleteTodoFailure = (payload) =>{
    return {
        type: DELETE_TODO_FAILURE,
        payload
    }
}


const deleteTodo = (payload) => (dispatch) => {
    dispatch(deleteTodoRequest());
    return axios.patch("http://localhost:3000/tasks", payload)
    .then(res => deleteTodoSuccess(res.data))
    .then(getTodo())
    .catch(err => deleteTodoFailure(err))
}

export {getTodo, updateTodo, addTodo, deleteTodo}


