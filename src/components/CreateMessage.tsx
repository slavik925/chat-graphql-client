import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  CREATE_MESSAGE
} from '../GQLQuery';

interface IProps {
  channelId?: string;
  message?: string;
  className?: string;
}

const useStyles = makeStyles({
  messageInput: {
    flexGrow: 2,
    paddingRight: '1em'
  }
});

export const CreateMessage: React.FC<IProps> = ({ channelId, className }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    message: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [createMessage] = useMutation(CREATE_MESSAGE);

  return (
    <div className={className}>
      <form
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
        onSubmit={(e) => {
          e.preventDefault();

          createMessage({
            variables: {
              channelId,
              content: values.message
            }
          });

          setValues({ ...values, message: '' });

        }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="message"
          label="Message"
          autoComplete=""
          autoFocus
          className={classes.messageInput}
          value={values.message}
          onChange={handleChange('message')}
        />
        <Button type="submit" variant="contained" color="secondary">
          Send
        </Button>
      </form>
    </div >
  )
};