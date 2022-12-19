//Importaciones
import React, {useState, useEffect } from 'react';
import {withRouter} from "react-router-dom";
import {Loader} from "semantic-ui-react";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

//Importación del Sass
import "./Album.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

function Album(props) {
  //Estados
    const {match} = props;
    const [album, setAlbum] = useState(null);
    const [albumImg, setAlbumImg] = useState(null);
    const [artist, setArtist] = useState(null);

    //Hook para obtener los albumes
    useEffect(() => {
        db.collection("albums").doc(match?.params?.id).get().then(response => {
          setAlbum(response.data());
        });
      }, [match]);

      //Hook para obtener las imagenes de los albumes
      useEffect(() => {
        if(album) {
            firebase.storage().ref(`album/${album?.banner}`).getDownloadURL().then(url => {
                setAlbumImg(url);
            });
        }
      }, [album]);

      useEffect(() => {
        if(album) {
            db.collection("artists").doc(album?.artist).get().then(response => {
                setArtist(response.data());
            })
        }
      }, [album]);

      if(!album || !artist) {
        return <Loader active>Cargando...</Loader>
      }

      return (
        <div className='album'>
          <div className='album__header'>
            <HeaderAlbum album={album} albumImg={albumImg} artist={artist}/>
            
          </div>
          <div className='album__songs'>
            <p>Canciones</p>
          </div>
        </div>
      );
}

export default withRouter(Album);


function HeaderAlbum(props) {
    const {album, albumImg, artist} = props;

    return (
        <>
            <div className='image' style={{backgroundImage: `url('${albumImg}')`}}/>
                <div className='info'>
                <h1>{album.name}</h1>
                <p>
                    De <span>{artist.name}</span>
                </p>
            </div>
        </>
    )
}
