import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { SignIn } from '../components/SignIn';
import { BasicLayout } from '../BasicLayout';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
    fontSize: '4.5rem'
  },
  headerText: {
    fontWeight: 'normal'
  }
});

export const MainPage = () => {
  const { header, headerText } = useStyles();

  return (
    <BasicLayout>
      <header className={header}>
        <h2 className={headerText}>
          Chat App
        </h2>
      </header>
      <div>
        <SignIn />
      </div>
    </BasicLayout>
  )
};