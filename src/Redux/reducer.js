import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from "./actionType";
import { GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS } from "./actionType";
import { UPDATE_TODO_FAILURE, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS } from "./actionType";
import { DELETE_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS } from "./actionType";

const initState = {
    todos : [],
    isLoading: false,
    isError : false
}

const reducer = (state=initState, {type, payload}) => {
    switch (type) {
        case GET_TODO_REQUEST:
        return{
            ...state, 
            isLoading: true,
            isError: false
        }
        case GET_TODO_SUCCESS:
        // const allTodos = [...state.todos, payload]
        return{
            ...state,
            todos: payload,
            isLoading: false,
       }
        case GET_TODO_FAILURE:
        return{
            ...state, 
            isLoading: false,
            isError: true
        }

        case ADD_TODO_REQUEST:
        return{
            ...state, 
            isLoading: true,
            isError: false
        }
        case ADD_TODO_SUCCESS:
        return{
            ...state,
            todos : [...state.todos, payload],
            isLoading: false,
            isError: false
        }
        case ADD_TODO_FAILURE:
        return{
            ...state, 
            isLoading: false,
            isError: true
        }

        case UPDATE_TODO_REQUEST:
        return{
            ...state, 
            isLoading: true,
            isError: false
        }
        case UPDATE_TODO_SUCCESS:
        const newTodo = state.todos.map( todo => {
            return payload.id === todo.id ? {...todo, ...payload} : todo;
        })
        return{
            todos : newTodo,
            isLoading: false,
            isError: false
        }
        case UPDATE_TODO_FAILURE:
        return{
            ...state, 
            isLoading: false,
            isError: true
        }
        
        case DELETE_TODO_REQUEST:
        return{
            ...state, 
            isLoading: true,
            isError: false
        }
        case DELETE_TODO_SUCCESS:
        const newTodo2 = state.todos.filter( todo => {
            return payload.id !== todo.id;
        })
        return{
            todos : newTodo2,
            isLoading: false,
            isError: false
        }
        case DELETE_TODO_FAILURE:
        return{
            ...state, 
            isLoading: false,
            isError: true
        }
            
        default:
            return{
                ...state,
            }
    }
}  

export {reducer}