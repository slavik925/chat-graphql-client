import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";

import {
  CHANNELS_QUERY,
} from '../GQLQuery';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: '1rem',
    backgroundColor: '#B1AAC4',
    color: '#48435B'
  },
  channelName: {
    color: '#8A7EB1',
    fontWeight: 'normal'
  },
  selectedChannelText: {
    color: '#FFF'
  },
  selectedChannelAvatar: {
    backgroundColor: '#F0F1F5'
  }
}));

export const Channels: React.FC = () => {
  const { loading, error, data } = useQuery(CHANNELS_QUERY);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List>
      {
        //@TODO: types
        data &&
        data.channels.map(({ id, name }: { id: string, name: string }) => (
          <ListItem button component={Link} to={`/channel/${id}`}>
            <Avatar
              className={clsx(classes.avatar, window.location.pathname.indexOf(id) !== -1 && classes.selectedChannelAvatar)}>
              {name[0]}
            </Avatar>
            <ListItemText primary={
              <Typography
                variant="h5"
                className={clsx(classes.channelName, window.location.pathname.indexOf(id) !== -1 && classes.selectedChannelText)}
              >
                {name}
              </Typography>
            } />
          </ListItem>
        ))
      }
    </List>
  );
};