import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Channels } from './components/Channels';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';

import {
  CURRENT_USER
} from './GQLQuery';

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    secondary: {
      main: '#E13D5C',
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        background: "#fff",
      }
    }
  },
});

const CurrentUserContext = React.createContext(null);

const App = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentUser = (data && data.currentUser) || null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" component={MainPage} />
          <Route path="/register" component={RegisterPage} />

          {/* {
        {currentUser && <Link to="/channels">Channels</Link>}
        {currentUser && <em>{currentUser.username}</em>}
        <Route path="/channels" component={Channels} />
       */}
        </Router>
      </MuiThemeProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
