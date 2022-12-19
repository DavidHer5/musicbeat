//Importaciones
import React, { useState} from 'react';
import {Button, Icon, Form, Input} from "semantic-ui-react";
import {toast} from "react-toastify";
import {validateEmail} from "../../../utils/Validaciones";
import firebase from '../../../utils/Firebase';
import "firebase/auth";

//Importación del Sass del Login
import "./LoginForm.scss";

export default function LoginForm(props) {

  //Estados para sacar los datos, mostrar u ocultar contraseña, formulario de error y cargar
  const {setSelectedForm} = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [mostrarContraseña, setMostrarContraseña] = useState (false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  //Manipulador para mostrar u ocultar contraseña
  const handlerMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña)
  }

  //Devuelve los datos que escribamos en el registro
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value

    }); 
  }

  //Validación y subida de los datos a la base de datos
  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    //Si el formulario es correcto, sube los datos
    if(formOk) {
      setIsLoading(true);
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .catch(err => {
        handlerErrors(err.code);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }


  return (
    <div className='login-form'>
        <h1>Iniciar Sesión</h1>

        <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Field>
            <Input 
              type='text'
              name="email"
              placeholder="Correo electrónico"
              icon="mail outline"
              error = {formError.email}
            />
            {formError.email && (
              <span className='error-text'>
                Introduce un correo electrónico válido
              </span>
            )}
          </Form.Field>
          <Form.Field>
            <Input 
              type={mostrarContraseña ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              error={formError.password}
              icon= {mostrarContraseña ? (
                <Icon name ="eye slash outline" link onClick={handlerMostrarContraseña} />
              ) : (
                <Icon name ="eye" link onClick={handlerMostrarContraseña} />
              )}
              
            />
            {formError.password && (
              <span className='error-text'>
                La contraseña debe de tener 6 caracteres como mínimo
              </span>
            )}
          </Form.Field>
          <Button type='submit' loading={isLoading}>
            Iniciar Sesión
          </Button>
        </Form>
        <div className='login-form__options'>
          <p onClick={() => setSelectedForm(null)}>Volver</p>
          <p>¿No tienes cuenta?
            <span onClick={() => setSelectedForm("register")}>Registrarse</span>
          </p>

        </div>
    </div>
  )
}

//Función para controlar algunos errores
function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrectas");
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrectas");
      break;
    default:
      break;
  }
}

//Función para los valores del registro
function defaultValueForm() {
  return{
    email: "",
    password: ""
  }
}
