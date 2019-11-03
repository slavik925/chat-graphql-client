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

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  titleApp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    ...theme.mixins.toolbar,
  },
  userNameText: {
    color: 'white'
  }
}));

export const ChatPage: React.FC = () => {
  const classes = useStyles();

  const currentUser = useContext<{ username: string } | null>(CurrentUserContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit">
            <ExitToAppIcon />
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
          {currentUser && <Typography variant="h5" className={classes.userNameText}>{currentUser.username}</Typography>}
        </div>
      </Drawer>
      <main>
        Content
       </main>
    </div>
  );
}
