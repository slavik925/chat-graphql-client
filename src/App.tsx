import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Channels } from './components/Channels';

import { useStyles } from './styles';

import {
  CURRENT_USER
} from './GQLQuery';

const CurrentUserContext = React.createContext(null);

const App = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentUser = (data && data.currentUser) || null;

  return (
    <div className={classes.root}>
      <CurrentUserContext.Provider value={currentUser}>
        <Router>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Chatoslav
              </Typography>
              {currentUser && <Link to="/channels">Channels</Link>}
              {currentUser && <em>{currentUser.username}</em>}
            </Toolbar>
          </AppBar>
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Route path="/channels" component={Channels} />
          {
            !currentUser && <Redirect to="/login" />
          }
        </Router>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
