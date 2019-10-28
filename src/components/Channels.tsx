import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, RouteComponentProps, Link } from "react-router-dom";
import { CreateChannelForm } from './CreateChannelForm';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../styles';

import { Messages } from './Messages';

import {
  CHANNELS_QUERY,
} from '../GQLQuery';

type TParams = {
  id: string
};

export const Channels: React.FC<RouteComponentProps<TParams>> = ({ match }) => {

  const { loading, error, data } = useQuery(CHANNELS_QUERY);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <CreateChannelForm />
          </Paper>
          <Paper className={classes.paper}>
            <List>
              {
                //@TODO: types
                data &&
                data.channels.map(({ id, name }: { id: string, name: string }) => (
                  <ListItem key={`item_${id}`} button component={Link} to={`${match.path}/${id}`}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
        <Grid item>
          <Route path={`${match.path}/:channelId`} component={Messages} />
        </Grid>
      </Grid>
    </div>
  );
};
