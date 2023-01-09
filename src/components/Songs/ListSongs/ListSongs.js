import React from 'react';
import {Table, Icon, Tab, Grid} from "semantic-ui-react";
import {map} from "lodash";

import "./ListSongs.scss";

export default function ListSongs(props) {
    const {songs, albumImg, playerSong} = props;

  return (
    <div>
        <h1>Canciones</h1>
        <Grid>
            {map(songs, song => (
                <Song key={song.id} song={song} playerSong={playerSong} albumImg={albumImg}/>
            ))}
        </Grid>
    </div>
  )
}


function Song(props) {
    const {song, albumImg, playerSong} = props;

    const onPlay = () => {
        playerSong(albumImg, song.name, song.fileName);
    }

    return (
        <div className="card" onClick={onPlay} >
            <h2>{song.name}</h2>
        </div>
    );
}