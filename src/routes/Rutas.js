//Importaciones
import React from 'react';
import {Switch, Route} from "react-router-dom";

//Importamos las páginas que necesitamos
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Artist from "../pages/Artist";
import Artists from "../pages/Artists";
import Albums from "../pages/Albums";
import Album from '../pages/Album';
import Chat from '../pages/Chat';
import Songs from '../pages/Songs';

export default function Rutas(props) {
  //Estados
  const {user, setReloadApp, playerSong} = props;

  return (
    <Switch>
        <Route path='/' exact>
          <Home playerSong={playerSong}/>
        </Route>
        <Route path='/artists' exact>
          <Artists />
        </Route>
        <Route path='/artist/:id' exact>
          <Artist playerSong={playerSong}/>
        </Route>
        <Route path='/albums' exact>
          <Albums />
        </Route>
        <Route path='/album/:id' exact>
          <Album playerSong={playerSong}/>
        </Route>
        <Route path='/songs' exact>
          <Songs playerSong={playerSong}/>
        </Route>
        <Route path="/chat" exact>
          <Chat />
        </Route>
        <Route path='/settings' exact>
          <Settings user={user} setReloadApp={setReloadApp}/>
        </Route>
    </Switch>
  )
}
