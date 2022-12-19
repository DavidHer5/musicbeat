//Importaciones
import React, {useState, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {map} from "lodash";
import {Link} from "react-router-dom";
import firebase from '../../utils/Firebase';
import "firebase/firestore";

//Importación del Sass
import "./Artists.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

export default function Artists() {
    //Estados
    const [artists, setArtists] = useState([]);

    //Hook de efecto para obtener los diferentes artistas
    useEffect(() => {
        db.collection("artists").get().then(response => {
            const arrayArtists = [];

            map(response?.docs, artist => {
                const data = artist.data();
                data.id = artist.id;
                arrayArtists.push(data);
            });
            setArtists(arrayArtists);
        });
    }, []);

  return (
    <div className='artists'>
      <h1>Artistas</h1>
      <Grid>
            {map(artists, artist => (
                <Grid.Column key={artist.id} computer={3}>
                    <RenderArtist artist={artist}/>
                </Grid.Column>
            ))}
      </Grid>
    </div>
  )
}

function RenderArtist(props) {
    const {artist} = props;
    const [bannerURL, setBannerURL] = useState(null);


    useEffect(() => {
        firebase.storage().ref(`artist/${artist.banner}`).getDownloadURL().then(url => {
            setBannerURL(url);
        });
    },[artist]);

    return(
        <Link to={`/artist/${artist.id}`}>
            <div className='artists__item'>
                <div className='avatar' style={{backgroundImage: `url('${bannerURL}')`}}/>
                <h3>{artist.name}</h3>
            </div>
        </Link>
    )
}
