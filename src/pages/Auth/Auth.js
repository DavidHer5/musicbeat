//Importaciones
import React, {useState} from 'react';

//Importamos los tres componentes para nuestra página
import AuthOptions from '../../components/Auth/AuthOptions/AuthOptions';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

//Importaciones de imagenes y el sass para el front de nuestra app
import BackgroundApp from "../../assets/jpg/nebulosaFondo.jpg";
import LogoBlanco from "../../assets/png/MusicBeat LEO.png";
import "./Auth.scss";


export default function Auth() {
  //Estado para seleccionar los formularios
  const [selectedForm, setSelectedForm ] = useState(null);

  //Manejador para saber que formulario se ha seleccionado
  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm}/>
      
      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm}/>
      
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />
    }
  }

  //Return para que se muestre en la aplicación
  return (
    <div className="auth" style= {{ backgroundImage: `url(${BackgroundApp})`}}>
      <div/>
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoBlanco} alt="MusicBeat"/>
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
