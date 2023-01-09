import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import {size, map} from "lodash";
import {Icon } from "semantic-ui-react";
import {Link} from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";


import "./SongsSlider.scss";

const db = firebase.firestore(firebase);

export default function SongsSlider(props) {
    const {title, data, playerSong} = props;

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        className: "songs-slider__list"
    }

    if(size(data) < 1) {
        return null;
    }


  return (
    <div className='songs-slider'>
        <h1>{title}</h1>
        <Slider {...settings}>
            {map(data, item => (
                <Song 
                    key={item.id} 
                    item={item} 
                    playerSong={playerSong}/>
            ))}
        </Slider>
    </div>
  )
}

function Song(props) {
    const {item, playerSong} = props;
    const [banner, setBanner] = useState(null);
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        db.collection("albums").doc(item.album)
            .get()
            .then(response => {
                const album2 = response.data();
                album2.id = response.id;
                setAlbum(album2);
                getImage(album2);
            });
    }, [item]);

    const getImage = album => {
        firebase.storage().ref(`album/${album.banner}`).getDownloadURL().then(bannerUrl => {
            setBanner(bannerUrl);
        })
    }

    const onPlay = () => {
        playerSong(banner, item.name, item.fileName);
    }

    return (
        <div className='songs-slider__list-song'>
            <div className='imagen' style={{backgroundImage: `url('${banner}')`}} onClick={onPlay}>
                <Icon name="play circle outline" />
            </div>
            <Link to={`/album/${album?.id}`}>
                <h3>{item.name}</h3>
            </Link>
            
        </div>
    )
}
