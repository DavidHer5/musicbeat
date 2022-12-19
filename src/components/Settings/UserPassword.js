//Importaciones
import React, {useState} from 'react';
import { toast } from 'react-toastify';
import {Button, Form, Input, Icon} from "semantic-ui-react";
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

export default function UserPassword(props) {
    //Estados
    const {setShowModal, setTitleModal, setContentModal} = props;

    //Función a la que hacemos referencia al clicar sobre el boton de actualizar la contraseña
    const onEdit = () => {
        setTitleModal("Actualizar contraseña");
        setContentModal(<ChangePasswordForm setShowModal={setShowModal}/>);
        setShowModal(true);
    }
    

  return (
    <div className='user-password'>
      <h3>Contraseña: *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

//Función para actualizar la contraseña
function ChangePasswordForm(props){
    //Estadois
    const {setShowModal} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    //Reautenticar la contraseña
    const reauthenticate = password => {
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(
                        auth.currentUser.email,
                        password
                        );
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            const currentUser = firebase.auth().currentUser;

            currentUser.updateEmail(formData.email).then(() => {
                const currentUser = firebase.auth().currentUser;
                currentUser.updatePassword(formData.newPassword).then(() => {
                    toast.success("Contraseña actualizada");
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(err => {
                    alertErrors(err?.code);
                    setIsLoading(false);
                })
            }).catch(err => {
                alertErrors(err?.code);
                setIsLoading(false);
            });
        }).catch(err => {
            console.log(err);
            alertErrors(err?.code);
            
        });
    }


    //Cambiar la contraseña correctamente validada
    const onSubmit = () => {
       if(!formData.currentPassword || !formData.newPassword || !formData.repeatNewPassword) {
        toast.warning("Debes completar todos los campos");
       }else if(formData.currentPassword === formData.newPassword) {
        toast.warning("La nueva contraseña no puede ser igual a la actual");
       }else if(formData.newPassword !== formData.repeatNewPassword) {
        toast.warning("La nueva contraseña no coincide");
       }else if(formData.newPassword.length < 6){
        toast.warning("La contraseña debe tener al menos 6 caracteres");
       }else {
        setIsLoading(true);
        reauthenticate(formData.currentPassword);
       }
    }

    return(
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    placeholder="Contraseña actual"
                    type={showPassword ? "text" : "password"}
                    icon={
                        <Icon 
                        name={showPassword ? "eye slash outline" : "eye"} 
                        link 
                        onClick={() => setShowPassword(!showPassword)}/>
                    }
                    onChange={e => setFormData({...formData, currentPassword: e.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={
                        <Icon 
                        name={showPassword ? "eye slash outline" : "eye"} 
                        link 
                        onClick={() => setShowPassword(!showPassword)}/>
                    }
                    onChange={e => setFormData({...formData, newPassword: e.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Repetir nueva contraseña"
                    type={showPassword ? "text" : "password"}
                    icon={
                        <Icon 
                        name={showPassword ? "eye slash outline" : "eye"} 
                        link 
                        onClick={() => setShowPassword(!showPassword)}/>
                    }
                    onChange={e => setFormData({...formData, repeatNewPassword: e.target.value})}
                />
            </Form.Field>
            <Button type='submit' loading={isLoading}>
                    Actualizar contraseña
            </Button>
        </Form>
    )
}
