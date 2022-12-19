//Importaciones
import React from 'react';
import {Button} from "semantic-ui-react";

//Importación del Sass
import "./AuthOptions.scss";

export default function AuthOptions(props) {
  //Sacamos el formulario de selección de los props
  const {setSelectedForm} =props;

  //Mostramos el formulario para registrarse o iniciar sesión
  return (
    <div className='box'>
      <div className="auth-options">
        <form>
          <h2>Te damos la bienvenida a MusicBeat</h2>
          <Button className="register" onClick={() => setSelectedForm("register")}>
            Registrarse
          </Button>
          <Button className="login" onClick={() => setSelectedForm("login")}>
            Iniciar Sesión
          </Button>
          </form>
      </div>
    </div>
  )
}
