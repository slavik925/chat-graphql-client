import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {
  LOGIN_MUTATION,
  CURRENT_USER
} from '../GQLQuery'
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    update(cache, { data: { login } }) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: { currentUser: login.user }
      });

      if (login) {
        localStorage.setItem('token', login.token)
    
        return <Redirect to='/' />
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            login({
              variables: {
                username: values.username,
                password: values.password
              }
            });
          }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Name"
            autoComplete="username"
            autoFocus
            value={values.username}
            onChange={handleChange('username')}
          />
          <TextField
            variant="outlined"
            id="password"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="off"
            margin="normal"
            onChange={handleChange('password')}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Login
          </Button>
          <Link component={RouterLink} to="/register" variant="body2" style={{ display: "block" }}>
            {"Don't have an account? Register!"}
          </Link>
        </form>
      </div>
    </Container>
  )
}