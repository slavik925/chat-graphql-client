import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  CHANNELS_QUERY,
  CREATE_CHANNEL,
} from '../GQLQuery';

interface IChannels {
  //@TODO: types
  channels: any;
}

export const CreateChannelForm: React.FC<{ channelName?: string }> = () => {

  const [values, setValues] = React.useState({
    channelName: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [createChannel] = useMutation(CREATE_CHANNEL, {
    update(cache, { data: { createChannel } }) {
      const channelsCache = cache.readQuery<IChannels>({ query: CHANNELS_QUERY }) || { channels: [] };
      cache.writeQuery({
        query: CHANNELS_QUERY,
        data: { channels: [...channelsCache.channels, createChannel] }
      });
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      createChannel({
        variables: {
          name: values.channelName
        }
      });

      setValues({ ...values, channelName: '' });
    }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="channelName"
        label="Channel name"
        autoComplete="channelName"
        autoFocus
        value={values.channelName}
        onChange={handleChange('channelName')}
      />
      <Button type="submit" variant="outlined">
        Create channel
      </Button>
    </form>
  )
};