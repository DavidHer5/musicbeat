//Importaciones
import React, {useState, useEffect}from 'react';
import { withRouter } from 'react-router-dom';
import {map} from "lodash";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import BannerArtist from '../../components/Artists/BannerArtist';
import SliderBasic from "../../components//Sliders/SliderBasic";

//Importación del Sass
import "./Artist.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);


function Artist(props) {
  //Estados
  const {match} = props;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  //Hook para obtener los artistas
  useEffect(() => {
    db.collection("artists").doc(match?.params?.id).get().then(response => {
      const data = response.data();
      data.id = response.id;
      setArtist(data);
    });
  }, [match]);

  useEffect(() => {
    if(artist) {
      db.collection("albums").where("artist", "==", artist.id).get().then(response => {
        const arrayAlbums = [];
        map(response?.docs, album => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push(data);
        });
        setAlbums(arrayAlbums);
      });
    }
  }, [artist]);

  return (
    <div className='artist'>
      {artist && <BannerArtist artist={artist} />}
      <div className='artist__content'>
        <SliderBasic 
          title="Álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
          />
        </div>
    </div>
  );
}

export default withRouter(Artist);
