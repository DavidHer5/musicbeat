//Importaciones
import React, {useState, useCallback }from 'react';
import {Image} from "semantic-ui-react";
import { useDropzone } from 'react-dropzone';
import {toast} from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/compat/storage";
import "firebase/compat/auth";
import NoAvatar from "../../assets/png/user.png";

export default function UpdateAvatar(props) {
    //Estados
    const {user, setReloadApp} = props;
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    //Función para arrastrar imagen o subir imagen
    const onDrop = useCallback(acceptedFiles => {
       const file = acceptedFiles[0];
       setAvatarUrl(URL.createObjectURL(file));
       uploadImage(file).then(() => {
        updateUserAvatar();
       });

    });

    //Función para pasar las imagenes que solo sean con .jpeg y .png
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    //Función para subir la imagen
    const uploadImage = file => {

        const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
        return ref.put(file)
    }

    //Función para actualizar el avatar del perfil
    const updateUserAvatar = () => {
        firebase.storage().ref(`avatar/${user.uid}`).getDownloadURL().then( async response => {
           await firebase.auth().currentUser.updateProfile({photoURL: response});
           setReloadApp(prevState => !prevState);
        }).catch(() => {
            toast.error("Error al actualizar el avatar")
        })
    }

  return (
    <div className='user-avatar' {...getRootProps()}>
        <input {...getInputProps()}/>
        {isDragActive ? (
            <Image src={NoAvatar} />
        ) : (
            <Image src={avatarUrl ? avatarUrl : NoAvatar} />
        )}
    </div>
  );
}
