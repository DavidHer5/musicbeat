import React, {useState, useEffect} from 'react';
import {map} from "lodash";
import {Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./Songs.scss";

const db = firebase.firestore(firebase);

export default function Songs(props) {
    const {playerSong, albumImg} = props

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        db.collection("songs")
        .get()
        .then(response => {
            const arraySongs = [];
            map(response?.docs, song => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
            })
            
            setSongs(arraySongs);
        })
    }, [])

  return (
    <div className='songs'>
      <h1>Canciones</h1>
      <Grid>
        {map(songs, song => (
            <div key={song.id}>
                <Song song={song} playerSong={playerSong} />
            </div>
        ))}
      </Grid>
    </div>
  )
}


function Song(props) {
    const {song, playerSong} = props;
    const [banner, setBanner] = useState(null);
    const [album, setAlbum] = useState(null);


    useEffect(() => {
        db.collection("albums").doc(song.album)
            .get()
            .then(response => {
                const album2 = response.data();
                album2.id = response.id;
                setAlbum(album2);
                getImage(album2);
            });
    }, [song]);

    const getImage = album => {
        firebase.storage().ref(`album/${album.banner}`).getDownloadURL().then(bannerUrl => {
            setBanner(bannerUrl);
        })
    }

    const onPlay = () => {
        playerSong(banner, song.name, song.fileName)
    }


    return (
        <Link to={`/album/${song.album}`}>
            <div className='songs_item'>
                <div className='box' style={{backgroundImage: `url('${banner}')`}} onClick={onPlay} />
                <h3>{song.name}</h3>     
            </div>
        </Link>
    )
}