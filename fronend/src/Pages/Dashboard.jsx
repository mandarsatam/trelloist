import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTodoTitle, getList, addList, getTask, getSubTask } from "../Redux/action"
import "../Components/TodoComponent"
import { TodoComponent } from '../Components/TodoComponent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CreateIcon from '@material-ui/icons/Create';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import GoogleLogin from 'react-google-login'
import { login_performer, logout_user } from '../Redux/auth/action'






const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingRight : theme.spacing(4),
    display: "flex",
    overflowX: "auto",
    height: "90vh"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
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
  fixedHeight: {
    backgroundColor: "#EBECF0",
  },
  addListButton: { 
    margin: "1em",
    height: "10em"
  },
  dummyDiv: {
    width: "10em", 
    visibility: "hidden"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const isLoading = useSelector(state => state.reducer.isLoading);
  const boardId = useSelector(state => state.authReducer.currentBoard._id, shallowEqual);
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const lists = useSelector(state => state.reducer.lists);

  // const {isLoggedIn} = useSelector(state => state.authReducer, shallowEqual);

  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [listTitle, setListTitle] = React.useState("");

  const dispatch = useDispatch();

  console.log(isLoggedIn);

  React.useEffect(() => {
    dispatch(getList({ boardId }));
    dispatch(getTask({ boardId }));
    dispatch(getSubTask({ boardId }));
  }, [isLoggedIn])

  // console.log(isLoggedIn);

  // React.useEffect(() => {

  // }, [isLoggedIn])


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  console.log(boardId);

  const handleAddList = () => {
    const payload = {
      boardId,
      listTitle
    };
    const action = addList(payload);
    dispatch(action)
      .then(res => {
        if (res.success) {
          dispatch(getList({ boardId }));
        }
      })
    setModalOpen(false)
  }

  // Menu Methods

  const anchorRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const prevOpen = React.useRef(menuOpen);

  React.useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    }
  }


  //Sign In
  const [signedIn, setSignedIn] = React.useState(false);
  const [token, setToken] = React.useState("");

  const handleResponse = (response) => {
    console.log(response);
    dispatch(login_performer(response.profileObj))
  }

  const handleLogOut = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentBoard")
    dispatch(logout_user());
  }



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            trelloist
          </Typography>
          <div style={{ marginRight: "2em" }}>
            <Button
              ref={anchorRef}
              aria-controls={menuOpen ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <i className="fas fa-user-circle" style={{ fontSize: "2em", color: "white" }}></i>
            </Button>
            <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper style={{ width: "10em", padding: "1em" }}>
                    <ClickAwayListener onClickAway={handleClose}>
                      {isLoggedIn === false ?
                        <div>
                          <GoogleLogin
                            clientId="610183070871-utsec0qra7f67jahi6hcjck971g0k8ad.apps.googleusercontent.com"
                            buttonText="Signin with Google"
                            onSuccess={handleResponse}
                            onFailure={handleResponse}
                            cookiePolicy={'single_host_origin'}
                          />
                        </div> :
                        <div>
                          <Button variant="contained" color="primary" onClick={handleLogOut}>Sign Out</Button>
                        </div>
                      }
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          {
            isLoading === true ? <CircularProgress style={{ margin: "1em auto" }} /> :
              <>
                {
                  lists.map(e =>
                    <TodoComponent compTitle={e.listTitle} id={e._id} key={e._id} />
                  )
                }
                <Button size="large" variant="outlined" onClick={handleOpen} className={classes.addListButton}>Add Another list</Button>
                <div className={classes.dummyDiv}>Somewhere</div>
              </>
          }
        </Container>
      </main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper2}>
            <h4><CreateIcon fontSize="small" />Create List</h4>
            <TextField id="standard-basic" placeholder="List Title" onChange={(e) => setListTitle(e.target.value)} />
            <div className="save_btn_cont">
              <Button variant="contained" color="primary" onClick={handleAddList}>Save</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export { Dashboard }