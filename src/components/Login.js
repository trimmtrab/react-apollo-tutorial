import React, { Component } from 'react'

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    login: true, // switch between Login and SignUp
    password: '',
    name: '',
  }

  _confirm = async (data) => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token => {
    // Do not store JWTs in localStorage in real apps
    // This is only for learning purpose
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {
          !login && (
          <input
            onChange={event => this.setState({ name: event.target.value })}
            placeholder="Your name"
            type="text"
            value={name}
          />
          )}
          <input
            onChange={event => this.setState({ email: event.target.value })}
            placeholder="Your email address"
            type="text"
            value={email}
          />
          <input
            onChange={event => this.setState({ password: event.target.value })}
            placeholder="Choose a safe password"
            type="password"
            value={password}
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {
            mutation => (
              <div
                className="pointer mr2 button"
                onClick={mutation}
              >
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {
            login ?
              'need to create an account?' :
              'already have an account?'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
