//Importaciones
import React, {useState, useEffect} from 'react';
import HomeBanner from '../../components/HomeBanner';
import SliderBasic from "../../components/Sliders/SliderBasic";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import {map} from "lodash";

//Importación del Sass
import "./Home.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

export default function Home() {
  //Estados
  const [artists, setArtists] = useState ([]);
  const [albums, setAlbums] = useState([]);

  //Hook para obtener los artistas
  useEffect(() => {
    db.collection("artists").get().then((response) => {
      const arrayArtists = [];
      map(response?.docs, artist => {
        const data = artist.data();
        data.id = artist.id;
        arrayArtists.push(data);
      });
      setArtists(arrayArtists);
    });
  }, []);

  //Hook para obtener los albumes
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
    <>
      <HomeBanner />
      <div className='home'>
        <SliderBasic title="Últimos artistas" data={artists} folderImage="artist" urlName="artist" />
        <SliderBasic title="Últimos álbumes" data={albums} folderImage="album" urlName="album" />
      </div> 
    </>
  )
}
