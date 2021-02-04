import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import LyricCreate from './LyricCreate';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    console.log(this.props);
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
