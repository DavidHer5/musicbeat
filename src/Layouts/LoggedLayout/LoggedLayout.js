//Importaciones
import React from 'react';
import { Grid } from "semantic-ui-react";
import {BrowserRouter as Router} from "react-router-dom";
import Rutas from "../../routes/Rutas";
import MenuLateral from '../../components/MenuLateral';
import TopBar from '../../components/TopBar';
import Player from "../../components/Player";
//import firebase from "../../utils/Firebase";
import "firebase/auth";

//Importación del Sass
import "./LoggedLayout.scss";

//Función que organiza las diferentes partes de nuestro bloque principal.
export default function LoggedLayout(props) {
    
    const { user, setReloadApp } = props;

    return (
        <Router>
            <Grid className='logged-layout'>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MenuLateral user={user} />
                    </Grid.Column>
                    <Grid.Column className='content' width={13}>
                        <TopBar user={user} />
                        <Rutas user={user} setReloadApp={setReloadApp}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Player />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Router>
    );
}

