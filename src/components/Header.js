import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">
            Hacker News
          </div>

          <Link to="/" className="ml1 no-underline black">
            new
          </Link>

          <div className="ml1">|</div>
          <Link to="/top" className="ml1 no-underline black">
            top
          </Link>

          <div className="ml1">|</div>
          <Link to="/search" className="ml1 no-underline black">
            search
          </Link>

          {
          authToken && (
            <Fragment>
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
            </Fragment>
          )}
        </div>

        <div className="flex flex-fixed">
          {
          authToken ?
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push('/');
              }}
            >
              logout
            </div> :
            <Link to="/login" className="ml1 no-underline black">
              login
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
