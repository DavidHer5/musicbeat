//Importaciones
import React, {useState, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {map} from "lodash";
import {Link} from "react-router-dom";
import firebase from '../../utils/Firebase';
import "firebase/firestore";

//Importación del Sass
import "./Albums.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

export default function Albums() {
    //Estados
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        db.collection("albums").get().then(response => {
            const arrayAlbums = [];

            map(response?.docs, album => {
                const data = album.data();
                data.id = album.id;
                arrayAlbums.push(data);
            });
            setAlbums(arrayAlbums);
        });
    }, []);


  return (
    <div className='albums'>
      <h1>Albumes</h1>
      <Grid>
            {map(albums, album => (
                <Grid.Column key={album.id} computer={3}>
                    <RenderAlbum album={album}/>
                </Grid.Column>
            ))}
      </Grid>
    </div>
  )
}

function RenderAlbum(props) {
    const {album} = props;
    const [bannerURL, setBannerURL] = useState(null);


    useEffect(() => {
        firebase.storage().ref(`album/${album.banner}`).getDownloadURL().then(url => {
            setBannerURL(url);
        });
    },[album]);

    return(
        <Link to={`/album/${album.id}`}>
            <div className='albums__item'>
                <div className='avatar' style={{backgroundImage: `url('${bannerURL}')`}}/>
                <h3>{album.name}</h3>
            </div>
        </Link>
    )
}
