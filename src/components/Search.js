import React, { Component } from 'react';

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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

class Search extends Component {
  state = {
    filter: '',
    links: [],
  }

  handleInputChange = (event) =>{
    this.setState({ filter: event.target.value });
  }

  handleSearchClick = () => {
    this._executeSearch();
  }

  _executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links;

    this.setState({ links });
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            className="mh2"
            onChange={this.handleInputChange}
            type='text'
          />
          <button onClick={this.handleSearchClick}>
            OK
          </button>
        </div>
        {
          this.state.links.map((link, index) => (
            <Link
              index={index}
              key={link.id}
              link={link}
            />
        ))}
      </div>
    );
  }
}

// withApollo injects the ApolloClient instance
// created at index.js into the component
// as a new prop called client
export default withApollo(Search)