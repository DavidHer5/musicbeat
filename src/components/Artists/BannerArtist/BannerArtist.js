//Importaciones
import React, {useState, useEffect} from 'react';
import firebase from "../../../utils/Firebase";
import "firebase/storage";

//Importación del Sass
import "./BannerArtist.scss";

export default function BannerArtist(props) {
    //Estados
    const {artist} = props;
    const [bannerURL, setBannerURL] = useState(null);

    //Hook de efecto para obtener los artistas
    useEffect(() => {
        firebase.storage().ref(`artist/${artist.banner}`).getDownloadURL().then(url => {
            setBannerURL(url);
        })
    }, [artist]);

  return (
    <div className='banner-artist' style={{backgroundImage: `url('${bannerURL}')`}}>
        <div className='banner-artist__gradiente'></div>
        <div className='banner-artist__info'>
            <h4>Artista</h4>
            <h1>{artist.name}</h1>
        </div>
    </div>
  )
}
