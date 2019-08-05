import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Link from './Link';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // TODO: Make components re-render on update
    const data = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => link.id === linkId);

    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Fetching</div>;
          }

          if (error) {
            return <div>Error</div>;
          }

          const linksToRender = data.feed.links;

          return (
            <div>
              {
                linksToRender.map((link, index) => (
                  <Link
                    index={index}
                    key={link.id}
                    link={link}
                    updateStoreAfterVote={this._updateCacheAfterVote}
                  />
                ))
              }
            </div>
          );
        }}
      </Query>
    );
  }
};

export default LinkList;
