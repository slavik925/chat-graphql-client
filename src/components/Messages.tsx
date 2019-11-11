import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useSubscription } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { CreateMessage } from "./CreateMessage";
import Typography from '@material-ui/core/Typography';

import {
  GET_CHANNEL,
  MESSAGE_ADDED_SUBSCRIPTION
} from '../GQLQuery';

type TParams = {
  channelId: string;
}

interface IMessage {
  content: string;
  user: {
    username: string;
  }
  createdAt: number;
}

const useStyles = makeStyles(theme => ({
  createMessage: {
    position: 'absolute',
    bottom: '2em',
    right: '2em',
    left: '20em'
  },
  message: {
    backgroundColor: '#B1AAC4',
    borderRadius: '.5rem',
    marginBottom: '1rem'
  },
  channelHeader: {
    position: 'absolute',
    top: '.8rem',
    right: '10rem',
    zIndex: 2000,
    color: '#8A7EB1'
  }
}));

export const Messages: React.FC<RouteComponentProps<TParams>> = ({ match }) => {

  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CHANNEL, {
    variables: {
      id: match.params.channelId
    }
  });

  const subscription = useSubscription(
    MESSAGE_ADDED_SUBSCRIPTION,
    { variables: { channelId: match.params.channelId } }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const messages: IMessage[] = data.channel.messages;

  if (subscription.data && subscription.data.messageAdded) {
    messages.push(subscription.data.messageAdded);
  }

  return (
    <div>
      <Typography variant="h4" className={classes.channelHeader}>
        {data.channel.name}
      </Typography>
      <List>
        {
          messages.map(({ content, user, createdAt }, index) => (
            <ListItem key={'list_' + createdAt + index} className={classes.message}>
              <ListItemText primary={content} secondary={`${user.username} ${moment(createdAt).calendar()}`} />
            </ListItem>
          ))
        }
      </List>
      <CreateMessage channelId={match.params.channelId} className={classes.createMessage} />
    </div>
  )
};