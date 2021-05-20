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
import { updateList, getList, deleteList, getTask, addTask, getSubTask} from "../Redux/action"
import CreateIcon from '@material-ui/icons/Create';
import Box from '@material-ui/core/Box';
import moment from "moment";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Paper } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainCard: {
        height: "max-content",
        backgroundColor: "#EBECF0",
        padding: "0 1em 1em 1em",
        minWidth: "300px",
        backgroundColor: "#EBECF0",
        margin: "1em"
    },
    cardTop: {
        display: "flex",
        justifyContent: "space-between"
    },
    paper2: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        padding: theme.spacing(2, 4, 3),
        outline: "none",
        height: "30vh",
        width: "30%",
        position: "relative",
        borderRadius: "10px",
    },
}))

const TodoComponent = ({ compTitle, id }) => {
    const boardId = useSelector(state => state.boardId);
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [listTitle, setListTitle] = React.useState(compTitle);
    const [dialogDelete, setDeleteDialog] = React.useState(false);

    const tasks = useSelector(state => state.tasks.filter(task => {
        return task.list === id;
    }))


    const handleOpenEdit = () => {
        setEditModal(true);
    };

    const handleCloseEdit = () => {
        setEditModal(false);
    };


    const dispatch = useDispatch();

    const handleAdd = () => {
        let today = moment();
        let tomorrow = moment(today).add(1, 'days').format("YYYY-MM-DD");
        const payload = {
            listId : id,
            boardId : boardId,
            title,
            status: false,
            scheduleDate: tomorrow
        };
        const action = addTask(payload);
        dispatch(action)
        .then(res => {
            if (res.success) {
                dispatch(getTask({boardId}));
            }
        })
    }

    const handleEditListTitle = () => {
        let payload = {
            id,
            title: listTitle
        }
        const action = updateList(payload);
        dispatch(action)
            .then(res => {
                if (res.success) {
                    dispatch(getList({ boardId }));
                }
            })
    }

    const handleDelete = () => {
        let payload = { 
            id
        }
        const action = deleteList(payload);
        dispatch(action)
        .then(res => {
            if(res.success){
                dispatch(getList({boardId}));
            }
        })
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    }

    return (
        <div>
            <Card className={classes.mainCard}>
                <CardContent style={{ padding: "8px 8px" }}>
                    <Box className={classes.cardTop}>
                        <Typography align="left" variant="h6" style={{ padding: "6px 0" }}>
                            {compTitle}
                        </Typography>
                        <IconButton onClick={handleOpenEdit}>
                            <CreateIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </CardContent>
                <div>
                    {tasks?.map(item => (
                        <TodoCard key={item._id} {...item} id ={item._id}/>
                    ))}
                </div>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <TextField variant="filled" placeholder="Add a task" fullWidth={true} onChange={(e) => { setTitle(e.target.value) }} />
                    </Grid>
                    <Grid item md={2}>
                        <IconButton aria-label="add" onClick={handleAdd}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editModal}
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editModal}>
                    <div className={classes.paper2}>
                        <h4><CreateIcon fontSize="small" />Edit List</h4>
                        <TextField id="standard-basic" defaultValue={listTitle} onChange={(e) => setListTitle(e.target.value)} />
                        <div className="save_btn_cont">
                            <Button variant="contained" color="primary" onClick={handleEditListTitle}>Save</Button>
                        </div>
                        <div className="delete_btn_cont">
                            <Button variant="contained" color="secondary" onClick={handleDeleteDialogOpen}>Delete</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
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
                        Are you sure you want to delete the list <b>{compTitle}</b> ?
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
        </div>
    )
}

export { TodoComponent }
