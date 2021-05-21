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
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addSubTask, deleteTask, deleteTodo, getTask, getTodo, updateTask, updateTodo } from "../../Redux/action.js"
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Paper } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EventIcon from '@material-ui/icons/Event';
import moment from "moment";
import { TodoSubCard } from "./TodoSubCard/TodoSubCard"


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
        position: "relative",
        borderRadius: "10px",
    },
    dialog: {
        borderRadius: "10px"
    },
    todoCardCont: {
        marginBottom: "10px"
    },
    todoCardTop: {
        margin: "auto",
        display: "flex",
        marginBottom: "0.5em"
    },
    todoCardDetails: {
        display: "flex"
    },
    dummyCheckbox: {
        visibility: "hidden"
    }
}));

const TodoCard = ({ id, title, status, scheduleDate, list }) => {
    const boardId = useSelector(state => state.authReducer.currentBoard._id, shallowEqual);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [subTitle, setSubTitle] = React.useState("");
    const [taskTitle, setTaskTitle] = React.useState(title);
    const [taskScheduleDate, setTaskScheduleDate] = React.useState(scheduleDate);
    const [taskStatus, setTaskStatus] = React.useState(status);
    const [dialogDelete, setDeleteDialog] = React.useState(false);
    const lists = useSelector(state => state.reducer.lists);
    const [currList, setCurrList] = React.useState(list);

    const subTasks = useSelector(state => state.reducer.subTasks.filter(subTask => {
        return subTask.task === id;
    }))

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubTask = () => {
        const postObj = {
            boardId,
            listId: list,
            taskId: id,
            title: subTitle,
            status: false
        }
        const action = addSubTask(postObj);
        dispatch(action)
            .then(res => {
                if(res.success){
                    dispatch(getTask({boardId}));
                }
            })

    }

    const handleSave = () => {
        const updateObj = {
            id,
            title: taskTitle,
            status: taskStatus,
            scheduleDate: taskScheduleDate,
            listId: list
        }
        const action = updateTask(updateObj);
        dispatch(action)
            .then(res => {
                if (res.success) {
                    dispatch(getTask({ boardId }));
                }
            })
    }

    const handleTaskStatus = (checked) => {
        setTaskStatus(checked);
        const updateObj = {
            id,
            title: taskTitle,
            status: checked,
            scheduleDate: taskScheduleDate,
            listId: list
        }
        const action = updateTask(updateObj);
        dispatch(action)
            .then(res => {
                if (res.success) {
                    dispatch(getTask({ boardId }));
                }
            })
    }

    const handleListChange = (e) => {
        setCurrList(e.target.value);
        const updateObj = {
            id,
            title: taskTitle,
            status: taskStatus,
            scheduleDate: taskScheduleDate,
            listId: e.target.value
        }
        const action = updateTask(updateObj);
        dispatch(action)
            .then(res => {
                if (res.success) {
                    dispatch(getTask({ boardId }));
                }
            })
    }

    const handleDelete = () => {
        const payload = {
            id
        }
        const action = deleteTask(payload);
        dispatch(action)
            .then(res => {
                if (res.success) {
                    dispatch(getTask({ boardId }));
                }
            })
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    }


    const handleSubTaskEdit = (id) => {
        // const newSubTasks = todoSubTasks?.map(subTask => {
        //     return subTask.id === id ? {...subTask, status: !subTask.status} :subTask;
        // })
        // setTodoSubTasks(newSubTasks);
    }


    return (
        <Paper className={classes.todoCardCont}>
            <Box className={classes.todoCardTop}>
                <Checkbox primary="true" checked={taskStatus} onChange={(e) => handleTaskStatus(e.target.checked)} />
                <div style={{ flexGrow: "1", textAlign: "left" }}>
                    <p style={taskStatus === true ? { textDecoration: "line-through" } : null}>{title}</p>
                </div>
                {
                    taskStatus === false ? <IconButton onClick={handleOpen}><CreateIcon fontSize="small" /></IconButton> : <IconButton aria-label="delete" onClick={handleDeleteDialogOpen}><DeleteIcon fontSize="small" /></IconButton>
                }
            </Box>
            <Box className={classes.todoCardDetails}>
                <Checkbox className={classes.dummyCheckbox} />
                <Box style={{ display: "flex" }}>
                    <EventIcon color="action" fontSize="small" />
                    <Typography variant="subtitle2" style={{ color: "#757575", marginLeft: "5px" }}>{moment(taskScheduleDate, 'YYYY-MM-DD').format('D MMM')}</Typography>
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
                    <ErrorOutlineIcon />
                    <Typography variant="subtitle1">
                        Are you sure you want to delete <b>{title}</b> ?
                    </Typography>
                </DialogTitle>
                <Divider />
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
                        <h4><CreateIcon fontSize="small" /> Edit</h4>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Box>
                                    <Checkbox primary="true" checked={taskStatus} onChange={(e) => setTaskStatus(e.target.checked)} />
                                    <TextField id="standard-basic" defaultValue={title} onChange={(e) => setTaskTitle(e.target.value)} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <RadioGroup aria-label="gender" name="gender1" value={currList} onChange={handleListChange}>
                                    <Box>
                                        {
                                            lists?.map(item => (
                                                <FormControlLabel value={item._id} control={<Radio />} label={item.listTitle} key={item._id}/>
                                            ))
                                        }
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="date"
                                    label="Schedule"
                                    type="date"
                                    className={classes.textField}
                                    value={taskScheduleDate}
                                    onChange={(e) => setTaskScheduleDate(e.target.value)}
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
                                <ErrorOutlineIcon />
                                <Typography variant="subtitle1">
                                    Are you sure you want to delete <b>{title}</b> ?
                                </Typography>
                            </DialogTitle>
                            <Divider />
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
                            <hr />
                            <Box>
                                <IconButton aria-label="add" onClick={(e) => handleSubTask(e)}>
                                    <AddIcon />
                                </IconButton>
                                <TextField size="small" style={{ padding: "10px" }} placeholder="Add a task" onChange={e => setSubTitle(e.target.value)} />
                            </Box>
                            {
                                subTasks?.map(subTask => (
                                    <TodoSubCard key={subTask._id} {...subTask} />
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

export { TodoCard }
