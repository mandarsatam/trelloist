import { ADD_LIST,GET_LIST, GET_TASK , ADD_TASK, UPDATE_TASK, DELETE_TASK, GET_SUBTASK, ADD_SUBTASK, UPDATE_SUBTASK } from "./actionType";
import { UPDATE_LIST } from "./actionType";
import { DELETE_LIST } from "./actionType";

const initState = {
    lists: [],
    tasks: [],
    subTasks: [],
    todos: [],
    todoTitle: [],
    isLoading: true,
    isError: false
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {

        case GET_LIST:
            return {
                ...state,
                lists: payload,
                isLoading: false,
            }
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, payload],
                isLoading: false,
                isError: false
            }

        case UPDATE_LIST:
            const newLists = state.lists.map(list => {
                return payload.id === list._id ? { ...list, ...payload } : list;
            })
            return {
                ...state,
                lists: newLists,
                isLoading: false,
                isError: false
            }

        case DELETE_LIST:
            const newLists2 = state.lists.filter(list => {
                return payload.id !== list._id;
            })
            return {
                ...state,
                lists: newLists2,
                isLoading: false,
                isError: false
            }


        case GET_TASK:
            return {
                ...state,
                tasks: payload,
                isLoading: false,
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload],
                isLoading: false,
                isError: false
            }
        case UPDATE_TASK:
            const newTasks = state.tasks.map(task => {
                return payload.id === task._id ? { ...task, ...payload } : task;
            })
            return {
                ...state,
                tasks: newTasks,
                isLoading: false,
                isError: false
            }
        case DELETE_TASK:
            const newTasks2 = state.tasks.filter(task => {
                return payload.id !== task._id;
            })
            return {
                ...state,
                tasks: newTasks2,
                isLoading: false,
                isError: false
            }

        //SubTasks

        case GET_SUBTASK:
            return {
                ...state,
                subTasks: payload,
                isLoading: false,
            }
        case ADD_SUBTASK:
            return {
                ...state,
                subTasks: [...state.subTasks, payload],
                isLoading: false,
                isError: false
            }
        case UPDATE_SUBTASK:
            const newSubTasks = state.subTasks.map(subTask => {
                return payload._id === subTask._id ? { ...subTask, ...payload } : subTask;
            })
            return {
                ...state,
                subTasks: newSubTasks,
                isLoading: false,
                isError: false
            }
        // case DELETE_TASK:
        //     const newTasks2 = state.tasks.filter(task => {
        //         return payload.id !== task._id;
        //     })
        //     return {
        //         ...state,
        //         tasks: newTasks2,
        //         isLoading: false,
        //         isError: false
        //     }



        default:
            return {
                ...state,
            }
    }
}

export { reducer }