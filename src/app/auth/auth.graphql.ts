import gql from 'graphql-tag';

export const QUERY_LOGIN = gql`
  query Login($req: LoginRequest) {
    Login(req: $req) {
      userId
      name
      email
      role
    }
  }
`;

export const QUERY_LOGIN_WITH_OAUTH = gql`
  query LoginWithOAuth($req: LoginOAuthRequest) {
    LoginWithOAuth(req: $req) {
      userId
      name
      email
      role
    }
  }
`;
