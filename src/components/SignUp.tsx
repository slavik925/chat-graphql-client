import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {
  REGISTER_MUTATION,
} from '../GQLQuery';

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

export const SignUp = () => {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [register, { data }] = useMutation(REGISTER_MUTATION);

  if (data) {
    return <Redirect to='/login' />
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form onSubmit={(e) => {
          e.preventDefault();
          register({
            variables: {
              username: values.username,
              password: values.password
            }
          })
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
            color="primary"
          >
            Register
        </Button>
        </form>
      </div>
    </Container>
  )
};