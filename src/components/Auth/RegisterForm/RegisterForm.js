//Importaciones
import React, {useState} from 'react';
import { Form, Icon, Input, Button} from "semantic-ui-react";
import {toast} from "react-toastify"
import { validateEmail} from "../../../utils/Validaciones";
import firebase from "../../../utils/Firebase";
import "firebase/compat/auth";



//Importación del archivo Sass 
import "./RegisterForm.scss";


export default function RegisterForm(props) {

  //Sacamos el formulario de selección de los props
  const {setSelectedForm} = props;

  //Estados para Sacar los Datos, Mostrar la contraseña, formulario de error y cargar
  const [formData, setFormData] = useState(defaultValueForm());
  const [mostrarContraseña, setMostrarContraseña] = useState (false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  //Manipulador para mostrar la contraseña
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

  //Enviar el formulario
  const onSubmit = () => {

    //Errores y advertencias para el usuario si introduce datos erroneos
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

    if(!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    //Si el formulario esta correctamente escrito, mandará los valores a la base de datos
    if(formOk) {
      setIsLoading(true);
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
        changeUserName();
        //sendVerificationEmail();

      }).catch(() => {
        toast.error("Error al crear la cuenta");
      }).finally(() => {
        setIsLoading(false);
        setSelectedForm(null);
      });
      
    }
  };

  //Actualizar el nombre de usuario cuando se registre
  const changeUserName = () => {
    firebase.auth().currentUser.updateProfile({
      displayName: formData.username
    }).catch(() => {
      toast.error("Error al asignar el nombre de usuario")
    });
  };

  /*const sendVerificationEmail = () => {
    firebase.auth().currentUser.sendVerificationEmail().then(() => {
      toast.success("Se ha enviado el email de verificación");
    }).catch(() => {
      toast.error("Error al enviar el email de verificación");
    })
  }*/


  return (
    <div className='register-form'>
        <h1>Disfruta de la Música con MusicBeat gratis</h1>
        <Form onSubmit={onSubmit} onChange={onChange}>
          <Form.Field>
            <Input 
              type="text"
              name="email"
              placeholder="Correo electrónico"
              icon= "mail outline"
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
          <Form.Field>
            <Input 
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              icon= "user circle outline"
              error={formError.username}
            />
            {formError.username && (
              <span className='error-text'>
                Introduce un nombre de usuario
              </span>
            )}
          </Form.Field>
          <Button type="submit" loading={isLoading}>
            Continuar
          </Button>
        </Form>

        <div className='register-form__options'>
          <p onClick={() => setSelectedForm(null)}>Volver</p>
          <p>
            ¿Ya estás registrado?
            <span onClick={() => setSelectedForm("login")}>Iniciar Sesión</span>
          </p>
        </div>
    </div>
  );
}

//Función para los valores del registro
function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: ""
  };
}
