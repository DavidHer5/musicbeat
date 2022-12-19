//Importaciones
import React, {useState, useEffect} from 'react';
import firebase from "../../utils/Firebase";
import "firebase/storage";

//Importación del Sass
import "./HomeBanner.scss";

export default function HomeBanner() {
  //Estados
    const [bannerURL, setBannerURL] = useState(null);


    //Hook de efecto para obtener la imagen del banner
    useEffect(() => {
        firebase.storage().ref("images/home-banner.jpg").getDownloadURL().then(urlBanner => {
            setBannerURL(urlBanner);
        });
    }, []);

    if(!bannerURL){
        return null;
    }

  return (
    <div className='home-banner' style={{backgroundImage: `url('${bannerURL}')`}}>

    </div>
  )
}
