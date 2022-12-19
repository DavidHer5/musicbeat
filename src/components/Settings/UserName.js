//Importaciones
import React, { useState } from 'react';
import {Form, Input, Button} from "semantic-ui-react";
import {toast} from "react-toastify";
import firebase from '../../utils/Firebase';
import "firebase/compat/auth";

export default function UserName(props) {
  //Eeçstados
    const {user, setShowModal, setTitleModal, setContentModal, setReloadApp} =props;

    //Función a la que se le hace referenia en el return cuando queremos actualizar el nombre de usuario
    const onEdit = () => {
        setTitleModal("Actualizar nombre de usuario");
        setContentModal(
          <ChangeDisplayNameForm 
            setShowModal={setShowModal} 
            displayName={user.displayName}
            setReloadApp={setReloadApp}/>
        );
        setShowModal(true);
    }

  return (
    <div className='user-name'>
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

//Función para cambiar el nombre de usuario y mostrar el respectivo modal
function ChangeDisplayNameForm(props) {
  //Estados
  const {displayName, setShowModal, setReloadApp} = props;
  const [formData, setFormData] = useState({displayName: displayName});
  const [isLoading, setIsLoading] = useState(false);


  //Subir los datos actualizados correctamente validados
  const onSubmit = () => {
    if(!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    }else {
      setIsLoading(true);
      firebase.auth().currentUser.updateProfile({displayName: formData.displayName}).then(() => {
        setReloadApp(prevState => !prevState);
        toast.success("Actualizado correctamente");
        setIsLoading(false);
        setShowModal(false);
      }).catch (() => {
        toast.error("Error al actualizar el nombre de usuario");
        setIsLoading(false);
      })
    }
  }


  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={e => setFormData({displayName: e.target.value})}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar nombre
      </Button>
    </Form>
  )
}
