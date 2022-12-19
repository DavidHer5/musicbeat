//Importaciones
import React, { useState, useEffect } from 'react';
import {map, size} from "lodash";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

//Importación del Sass
import "./SliderBasic.scss";

export default function SliderBasic(props) {
  //Estados
    const {title, data, folderImage, urlName} = props;

    //Ajustes del Slider 
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        className: "slider-basic__list"
      };

  if(size(data) < 4) {
    return null;
  }

  return (
    <div className='basic-slider'>
        <h2>{title}</h2>
        <Slider {...settings}>
          {map(data, item => (
            <RenderItem key={item.id} item={item} folderImage={folderImage} urlName={urlName}/>
          ))}
        </Slider>
      </div>
  )
}

//Función para renderizar los diferentes artistas que hay en la base de datos
function RenderItem(props) {
    const {item, folderImage, urlName} = props;

    const [imageURL, setImageURL] = useState(null);

    //Hook para sacar los artistas
    useEffect(() => {
        firebase.storage().ref(`${folderImage}/${item.banner}`).getDownloadURL().then(url => {
            setImageURL(url);
        })
    }, [item])

    return(
      <Link to={`/${urlName}/${item.id}`}>
        <div className='slider-basic__list__items'>
            <div className='avatar' style={{backgroundImage: `url('${imageURL}')`}} />
            <h3>{item.name}</h3>
        </div>
      </Link>
    );
}