import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        user {
          username
        }
      }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!) {
    createChannel(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($channelId: ID!, $content: String!) {
    createMessage(channelId: $channelId, content: $content) {
      content
      createdAt
      user {
        username
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
      password
    }
  }
`;

export const CHANNELS_QUERY = gql`
  query {
    channels {
      id
      name
    }
  }
`;

export const GET_CHANNEL = gql`
  query GetChannel($id: ID!) {
    channel(id: $id) {
      messages {
        content
        createdAt
        user {
          username
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    currentUser {
      username
    }
  }
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      content
      createdAt
      user {
        username
      }
    }
  }
`;