import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CurrentUserContext } from '../App'
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CreateChannelForm } from '../components/CreateChannelForm';
import { Route, Link as RouterLink } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import Container from '@material-ui/core/Container';
import { Channels } from '../components/Channels';
import { Messages } from '../components/Messages';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#48435B',
    border: 'none'
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    background: '#FFF',
    boxShadow: 'none'
  },
  titleApp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    ...theme.mixins.toolbar,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoutIcon: {
    alignSelf: 'flex-end'
  },
  userNameText: {
    color: 'white',
    textDecoration: 'none'
  },
  fabAdd: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#F0F1F5'
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export const ChatPage: React.FC = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const currentUser = useContext<{ username: string } | null>(CurrentUserContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            aria-label="logout"
            color="secondary"
            className={classes.logoutIcon}
          >
            <ExitToAppIcon onClick={() => {
              localStorage.removeItem('token');
              client.resetStore();
            }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.titleApp}>
          {currentUser &&
            <RouterLink to='/' className={classes.userNameText}>
              <Typography variant="h5" >{currentUser.username}</Typography>
            </RouterLink>
          }
        </div>
        <Channels />
        <Fab
          color="secondary"
          component={RouterLink}
          className={classes.fabAdd}
          to="/create-channel"
          aria-label="Add"
        >
          <AddIcon />
        </Fab>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Route path="/create-channel" component={CreateChannelForm} />
          <Route path="/channel/:channelId" component={Messages} />
        </Container>
      </main>
    </div>
  );
};
