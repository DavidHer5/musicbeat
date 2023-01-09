//Importaciones
import React, { useState } from 'react';
import { Grid } from "semantic-ui-react";
import {BrowserRouter as Router} from "react-router-dom";
import Rutas from "../../routes/Rutas";
import MenuLateral from '../../components/MenuLateral';
import TopBar from '../../components/TopBar';
import Player from "../../components/Player";
import firebase from '../../utils/Firebase';
import BackgroundApp from "../../assets/jpg/spaceFondo.jpg";
import "firebase/storage";
import "firebase/auth";

//Importación del Sass
import "./LoggedLayout.scss";

//Función que organiza las diferentes partes de nuestro bloque principal.
export default function LoggedLayout(props) {
    
    const { user, setReloadApp, onChange, percentage} = props;
    const [songData, setSongData] = useState(null);

    const playerSong = (albumImage, songName, songNameFile) => {

        firebase.storage().ref(`song/${songNameFile}`).getDownloadURL().then(url => {
            setSongData({url, image: albumImage, name: songName});
        });
    }

    console.log(songData);
    
    return (
        <Router>
            <Grid className='logged-layout' style= {{ backgroundImage: `url(${BackgroundApp})`}}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLateral user={user} />
                    </Grid.Column>
                    <Grid.Column className='content' width={13}>
                        <TopBar user={user} />
                        <Rutas user={user} setReloadApp={setReloadApp} playerSong={playerSong}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                {songData ? (
                    <Grid.Column width={16}>
                        <Player songData={songData} onChange={onChange} percentage={percentage}/>
                    </Grid.Column>
                ) : (
                    <Grid.Column width={16}>
                    </Grid.Column>
                )}
                </Grid.Row>
            </Grid>
        </Router>
    );
}

