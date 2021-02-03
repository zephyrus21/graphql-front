import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id },
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map((song) => (
      <li
        className="collection-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        key={song.id}
      >
        {song.title}
        <i
          className="material-icons"
          onClick={() => this.onSongDelete(song.id)}
        >
          delete
        </i>
      </li>
    ));
  }

  render() {
    console.log(this.props.data.songs);
    if (this.props.data.loading) return <div>Loading...</div>;
    else
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const query = fetchSongs;

export default graphql(mutation)(graphql(query)(SongList));
