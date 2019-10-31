import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { SignUp } from '../components/SignUp';
import { BasicLayout } from '../BasicLayout';

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
    fontSize: '4.5rem',
    height: '66px',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontWeight: 'normal'
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  textWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    display: 'flex'
  }
}));

export const RegisterPage = withRouter((props) => {

  const classes = useStyles();

  return (
    <BasicLayout>
      <div style={{ height: '100%'}}>
        <div className={classes.wrapper}>
          <header className={classes.header}>
            <Typography variant="h4" className={classes.headerText}>
              Chat App
          </Typography>
          </header>
          <div className={classes.textWrapper}>
            <Typography variant="h2" className={classes.headerText}>
              Welcome back!
            </Typography>

            <Typography variant="subtitle1">
              To keep connected with us please sign in with your personal info.
            </Typography>

            <Button onClick={() => props.history.push('/')} variant="outlined">
              Sign In
            </Button>
          </div>
        </div>
      </div>
      <div>
        <SignUp />
      </div>
    </BasicLayout >
  )
});