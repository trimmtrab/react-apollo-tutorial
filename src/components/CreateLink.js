import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { FEED_QUERY } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  _updateCacheAfterNewLink = (store, { data: { post }}) => {
    const first = LINKS_PER_PAGE;
    const orderBy = 'createdAt_DESC';
    const skip = 0;

    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, orderBy, skip },
    });

    data.feed.links.unshift(post);
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: { first, orderBy, skip },
    });
  }

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={event => this.setState({ description: event.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={event => this.setState({ url: event.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          onCompleted={() => this.props.history.push('/new/1')}
          variables={{ description, url }}
          update={this._updateCacheAfterNewLink}
        >
          {
          postMutation => (
            <button onClick={postMutation}>
              Submit
            </button>
          )}
        </Mutation>
      </div>
    )
  }
};

export default CreateLink;
