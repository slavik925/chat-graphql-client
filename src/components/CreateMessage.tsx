import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  CREATE_MESSAGE
} from '../GQLQuery';

interface IProps {
  channelId?: string;
  message?: string;
}

export const CreateMessage: React.FC<IProps> = ({ channelId }) => {

  const [values, setValues] = React.useState({
    message: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [createMessage] = useMutation(CREATE_MESSAGE);

  return (
    <div>
      <form onSubmit={(e) => {
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
          fullWidth
          id="message"
          label="Message"
          autoComplete="message"
          autoFocus
          value={values.message}
          onChange={handleChange('message')}
        />
        <Button type="submit" variant="outlined">
          Send
        </Button>
      </form>
    </div>
  )
};