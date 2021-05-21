import { LOGIN_ERROR_HANDLING, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER } from "./actionType"

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const currentBoard = JSON.parse(localStorage.getItem('currentBoard'));
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

const initState = {
    currentUser : currentUser === null ? {
        "_id": "60a75fe7e9abfa8973499731",
        "name": "admin",
        "email": "admin@gmail.com",
        } : currentUser,
    currentBoard : currentBoard === null ? {"_id": "60a75ff7e9abfa8973499732",
    "boardName": "localDemo",
    "user": "60a75fe7e9abfa8973499731"} : currentBoard,
    isLoading : false,
    isError : false,
    isLoggedIn : isLoggedIn === null ? false : isLoggedIn
}

const authReducer = (state = initState, action) => {
    switch (action.type){
        case LOGIN_REQUEST: {
            return{
                ...state,
                isLoading : true,
                isError : false,
                isLoggedIn : false
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("currentUser", JSON.stringify(action.payload[0]))
            localStorage.setItem("currentBoard", JSON.stringify(action.payload[1]))
            localStorage.setItem("isLoggedIn", JSON.stringify(true) )
            return{
                ...state,
                isLoggedIn : true,
                isError : false,
                isLoading : false,
                currentUser : action.payload[0],
                currentBoard: action.payload[1]
            }
        }
        case LOGIN_FAILURE : {
            return{
                ...state,
                isLoading : false,
                isError : true,
                isLoggedIn : false
            }
        }
        case LOGIN_ERROR_HANDLING : {
            return{
                ...state,
                isLoading : false,
                isError : false,
                isLoggedIn : false,
            }
        }
        case LOGOUT_USER : {
            return{
                ...state,
                isLoggedIn : false,
                isError : false,
                isLoading : false,
                currentUser : {
                    "_id": "60a75fe7e9abfa8973499731",
                    "name": "admin",
                    "email": "admin@gmail.com",
                    },
                currentBoard : {"_id": "60a75ff7e9abfa8973499732",
                "boardName": "localDemo",
                "user": "60a75fe7e9abfa8973499731"} 
            }
        }
        default:
            return state
    }
}

export {authReducer}