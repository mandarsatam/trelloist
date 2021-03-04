import React, { useState } from 'react'
import { TodoCard } from './TodoCard/TodoCard';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {getTodo, addTodo, deleteTodo, updateTodo} from "../Redux/action"
import {v4 as uuid} from "uuid";
import CreateIcon from '@material-ui/icons/Create';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    mainCard: {
        height: "max-content",
        backgroundColor: "#EBECF0",
        padding: "0 1em 1em 1em",
        minWidth: "300px",
        backgroundColor: "#EBECF0",
        margin:"1em"
    },
    cardTop:{
        display:"flex",
        justifyContent: "space-between"
    }
}))

const TodoComponent = ({compTitle}) => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const taskType = compTitle.replace(/\s/g, '');
    const todos = useSelector(state => state.todos.filter(todo =>{
        return todo.type === taskType;
    }))

    
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTodo())
    }, [dispatch])
  
    const handleAdd = () =>{
        const payload ={
            id: uuid(),
            title, 
            status : false,
            type: taskType,
            subTasks: [],
            scheduleDate : "tomorrow"
        };
        const action = addTodo(payload,null);
        dispatch(action)
        .then(res =>{
            if(res.success){
                dispatch(getTodo());
            }
        })
    }

    const addSubTask = (payload, type, id) =>{
        const action = updateTodo(payload, type, id);
        dispatch(action)
        .then(res =>{
            if(res.success){
                dispatch(getTodo());
            }
        }) 
    }

    return (
        <Card className={classes.mainCard}>
            <CardContent style={{padding:"8px 8px"}}>
                <Box className={classes.cardTop}>
                    <Typography align="left" variant="h6" style={{padding:"6px 0"}}>
                        {compTitle}
                    </Typography>
                    <IconButton >
                        <CreateIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </CardContent>
            <div>
                {todos?.map(item => (
                    <TodoCard key={item.id} {...item} addSubTask={addSubTask}/>
                ))}
            </div>
            <Grid container spacing={1}> 
                <Grid item md={10}>
                    <TextField  variant="filled" placeholder="Add a task" fullWidth={true} onChange={(e) =>{setTitle(e.target.value)}}/>
                </Grid>
                <Grid item md={2}>
                    <IconButton aria-label="add" onClick={handleAdd}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>      
        </Card>
    )
}

export {TodoComponent}
