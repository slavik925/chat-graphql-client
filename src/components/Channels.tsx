import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from '../styles';
import Avatar from '@material-ui/core/Avatar';

import {
  CHANNELS_QUERY,
} from '../GQLQuery';

type TParams = {
  id: string
};

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
            <Avatar>{name[0]}</Avatar>
            <ListItemText primary={name} />
          </ListItem>
        ))
      }
    </List>
  );
};