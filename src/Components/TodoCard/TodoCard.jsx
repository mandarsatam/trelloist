import React from 'react'
import "./TodoCard.css"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {v4 as uuid} from "uuid";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Button from '@material-ui/core/Button';
import {deleteTodo, getTodo, updateTodo} from "../../Redux/action.js"
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Paper } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EventIcon from '@material-ui/icons/Event';


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      padding: theme.spacing(2, 4, 3),
      outline: "none",
      height: "90vh",
      width: "50%",
      position:"relative",
      borderRadius: "10px",
    },
    dialog:{
        borderRadius: "10px"
    },
    todoCardCont:{
        marginBottom:"10px"
    },
    todoCardTop:{
        margin: "auto",
        display: "flex",
        marginBottom : "0.5em"
    },
    todoCardDetails:{
        display: "flex"
    },
    dummyCheckbox:{
        visibility: "hidden"
    }
}));

const TodoCard = ({id, title, status, type , scheduleDate,  addSubTask, subTasks}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [subTitle, setSubTitle] = React.useState("");
    const [todoTitle, setTodoTitle] = React.useState(title);
    const [todoScheduleDate, setTodoScheduleDate] = React.useState(scheduleDate);
    const [todoType, setTodoType] = React.useState(type);
    const [todoStatus, setTodoStatus] = React.useState(status);
    const [todoSubTasks, setTodoSubTasks] = React.useState(subTasks);
    const [dialogDelete, setDeleteDialog] = React.useState(false);

    React.useEffect(() => {
        setTodoSubTasks(subTasks);
    }, [subTasks])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubTask = () =>{
        const postObj = {
            id : uuid(),
            title : subTitle,
            status: false
        }
        addSubTask(postObj, type="subTask", id);
    }
    
    const dispatch = useDispatch();

    const handleSave = () => {
        const updateObj ={
            id,
            title: todoTitle,
            status: todoStatus,
            type: todoType,
            subTasks: todoSubTasks,
            scheduleDate: todoScheduleDate
        }
        const action = updateTodo(updateObj, type="task", id);
        dispatch(action)
        .then(res =>{
            if(res.success){
                dispatch(getTodo());
            }
        })
    }

    const handleDelete = (id) => {
        const action = deleteTodo(id);
        dispatch(action)
        .then(res => {
            if(res.success){
                dispatch(getTodo());
            }
        })
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    }


    const handleSubTaskEdit = (id) =>{
        const newSubTasks = todoSubTasks?.map(subTask => {
            return subTask.id === id ? {...subTask, status: !subTask.status} :subTask;
        })
        setTodoSubTasks(newSubTasks);
    }

    return (
        <Paper className={classes.todoCardCont}>
            <Box className={classes.todoCardTop}>
                <Checkbox primary checked={todoStatus} onChange = {(e) => setTodoStatus(e.target.checked)}/>
                <div style={{flexGrow:"1", textAlign:"left"}}>
                    <p style={todoStatus === true? {textDecoration:"line-through"} : null}>{title}</p> 
                </div>
                {
                    todoStatus === false? <IconButton onClick={handleOpen}><CreateIcon fontSize="small"/></IconButton> : <IconButton aria-label="delete" onClick={handleDeleteDialogOpen}><DeleteIcon fontSize="small"/></IconButton>
                }
            </Box>
            <Box className={classes.todoCardDetails}>
                <Checkbox className={classes.dummyCheckbox}/>
                <Box style={{display:"flex"}}>
                    <EventIcon color="action" fontSize="small"/> 
                    <Typography variant="subtitle3" style={{color:"#757575"}}>Feb 12</Typography>
                </Box>
            </Box>
             <Dialog
                open={dialogDelete}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.dialog}
            >
                <DialogTitle id="alert-dialog-title">
                    <ErrorOutlineIcon/>
                    <Typography variant="subtitle1">
                        Are you sure you want to delete <b>{title}</b> ?
                    </Typography>
                </DialogTitle>
                <Divider/>
                <DialogActions>
                <Button onClick={handleDeleteDialogClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={() => handleDelete(id)} color="secondary" variant="contained">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h4><CreateIcon fontSize="small"/> Edit</h4>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Box>
                                    <Checkbox primary checked={todoStatus} onChange = {(e) => setTodoStatus(e.target.checked)}/>
                                    <TextField id="standard-basic" defaultValue={title} onChange={(e) => setTodoTitle(e.target.value)}/>
                                </Box>
                            </Grid>
                            <Grid item>
                                <RadioGroup aria-label="gender" name="gender1" value={todoType} onChange={(e) => setTodoType(e.target.value)}>
                                    <Box>
                                        <FormControlLabel value="ToDo" control={<Radio />} label="To Do" />
                                        <FormControlLabel value="Doing" control={<Radio />} label="Doing" />
                                        <FormControlLabel value="Done" control={<Radio />} label="Done" />
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="date"
                                    label="Schedule"
                                    type="date"
                                    className={classes.textField}
                                    value={todoScheduleDate}
                                    onChange={(e) => setTodoScheduleDate(e.target.value)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                            <IconButton aria-label="delete" className={classes.margin} onClick={handleDeleteDialogOpen}>
                                <DeleteIcon />
                            </IconButton>
                            </Grid>
                        </Grid>

                            <Dialog
                                open={dialogDelete}
                                onClose={handleDeleteDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                className={classes.dialog}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    <ErrorOutlineIcon/>
                                    <Typography variant="subtitle1">
                                        Are you sure you want to delete <b>{title}</b> ?
                                    </Typography>
                                </DialogTitle>
                                <Divider/>
                                <DialogActions>
                                <Button onClick={handleDeleteDialogClose} variant="outlined">
                                    Cancel
                                </Button>
                                <Button onClick={() => handleDelete(id)} color="secondary" variant="contained">
                                    Delete
                                </Button>
                                </DialogActions>
                            </Dialog>
                        <div>
                            <h2>Subtasks</h2>
                            <hr/>
                            <Box>
                                <IconButton aria-label="add" onClick={(e) =>handleSubTask(e)}>
                                    <AddIcon />
                                </IconButton>
                                <TextField size="small" style={{padding:"10px"}} placeholder="Add a task" onChange={e => setSubTitle(e.target.value)}/>
                            </Box>
                            {
                                todoSubTasks?.map(subTask =>(
                                    <div className="subtask_card" key={subTask.id}>
                                        <Checkbox checked ={subTask.status} onChange={() => handleSubTaskEdit(subTask.id)}/>
                                        <Typography>{subTask.title}</Typography>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="save_btn_cont">
                            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Paper>
    )
}

export {TodoCard}
