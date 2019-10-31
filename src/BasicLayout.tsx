import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cLogo: {
    position: 'fixed',
    fontSize: '4.5rem',
    top: '42%',
    left: '45%',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'var(--colorPrimary)',
    border: '2rem solid var(--colorSecondary)',
    borderRadius: '50%',
    width: '93px',
    padding: '1rem',
    height: '93px',
    display: 'flex',
    margin: '0',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const BasicLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div id="basic-layout">
        {children}
      </div>
      <div className={classes.cLogo}>C</div>
    </>
  )
};