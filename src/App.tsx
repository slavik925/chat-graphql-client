import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Channels } from './components/Channels';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';
import { ChatPage } from './pages/ChatPage';

import {
  CURRENT_USER
} from './GQLQuery';

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    secondary: {
      main: '#E13D5C'
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        background: "#fff"
      }
    }
  },
});

export const CurrentUserContext = React.createContext<{ username: string } | null>(null);

const App = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currentUser = (data && data.currentUser) || null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MuiThemeProvider theme={theme}>
        <Router>
          {
            !currentUser && <Route path="/" exact component={MainPage} />
          }
          {
            !currentUser && <Route path="/login" component={MainPage} />
          }
          {
            !currentUser && <Route path="/register" component={RegisterPage} />
          }
          {
            currentUser && <Route path="/" exact component={ChatPage} />
          }
        </Router>
      </MuiThemeProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
