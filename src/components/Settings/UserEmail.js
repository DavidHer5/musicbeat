//Importaciones
import React, { useState } from 'react';
import {Button, Form, Input, Icon} from "semantic-ui-react";
import {toast} from "react-toastify";
//import {reauthenticate} from "../../utils/Api";
import firebaseApp  from '../../utils/Firebase' ;
import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
} from 'firebase/auth';
import alertErrors from "../../utils/AlertError";
import firebase from '../../utils/Firebase';
import "firebase/auth";

//Inicializo la base de datos
const db = firebase.firestore(firebaseApp);

export default function UserEmail(props) {
    //Estados
    const {user, setShowModal, setTitleModal, setContentModal} = props;

    //Función al que se hace referencia cuando clicamos en el botón actualizar para que nos pueda aparecer el modal para actualizar el email
    const onEdit = () => {
        setTitleModal("Actualizar correo electrónico");
        setContentModal(
            <ChangeEmailForm email={user.email} setShowModal={setShowModal}/>
        );
        setShowModal(true);
    }

  return (
    <div className='user-email'>
      <h3>Correo Electrónico: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar 
      </Button>
    </div>
  )
}

//Función y modal para actualizar el email
function ChangeEmailForm(props){
    //Estados
    const {email, setShowModal} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    
    //Reautenticación con firebase
    const reauthenticate = password => {
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(
                        auth.currentUser.email,
                        password
                        );
                        
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            const currentUser = firebase.auth().currentUser;

            currentUser.updateEmail(formData.email).then(() => {
                toast.success("Email actualizado");
                setIsLoading(false);
                setShowModal(false);
                currentUser.sendEmailVerification().then(() => {
                    firebase.auth().signOut();
                });
            }). catch(err => {
                alertErrors(err?.code);
                setIsLoading(false);
            })
        }).catch(err => {
            console.log(err);
            alertErrors(err?.code);
            
        });
    }


    const onSubmit= () => {
        if(!formData.email) {
            toast.warning("El email es el mismo");
        }else {
            setIsLoading(true);
            reauthenticate(formData.password);
            setIsLoading(false);

        }
    }

    return(
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    defaultValue={email} 
                    type="text"   
                    placeholder="Correo electrónico"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </Form.Field>
            <div className='div-validate'>
                Se necesita poner la contraseña para validar el email
            </div>
            <Form.Field>
                <Input 
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={
                        <Icon 
                        name={showPassword ? "eye slash outline" : "eye"} 
                        link 
                        onClick={() => setShowPassword(!showPassword)}/>
                    }
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar Email
            </Button>
        </Form>
    )
}
