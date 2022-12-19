//Importaciones
import React, { useCallback, useState } from 'react';
import {Form, Input, Button, Image} from "semantic-ui-react";
import {useDropzone} from "react-dropzone";
import NoImage from "../../../assets/png/no-image.png";
import AvatarArtista from "../../../assets/png/avatar_artista.png";
import {toast} from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../utils/Firebase';
import "firebase/storage";
import "firebase/firestore";

//Importación del Sass
import "./AddArtistForm.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

export default function AddArtistForm(props) {
    //Estados para sacar información, establecer el banner y los archivos y cargar
    const {setShowModal} = props;
    const [formData, setFormData] = useState(initialValueForm());
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    //Función para arrastrar las imagenes al modal
    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);
        setBanner(URL.createObjectURL(file));
    })

    //función para pasar las imagenes que solo sean con .jpeg y .png
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    //Cargar imagen en la base de datos
    const uploadImage = fileName => {
        const ref = firebase.storage().ref().child(`artist/${fileName}`);
        return ref.put(file);
    }

    //función para subir todos los datos validados
    const onSubmit = () => {
        if(!formData.name || !formData.generoMusical) {
            toast.warning("Rellena todos los datos");
        }else if(!file) {
            toast.warning("Sube la foto del artista");
        }else {
            setIsLoading(true);
            const fileName = uuidv4();
            uploadImage(fileName).then(() => {
                db.collection("artists")
                .add({name: formData.name,  generoMusical: formData.generoMusical, banner: fileName})
                .then(() => {
                    toast.success("Artista creado correctamente");
                    clearForm();
                    setIsLoading(false);
                    setShowModal(false);
                }).catch(() => {
                    toast.error("Error al crear el Artista")
                    setIsLoading(false);
                })
            }).catch(() => {
                toast.error("Error al subir la imagen");
                setIsLoading(false);
            })
        }
    }


    //Limpiar datos
    const clearForm = () => {
        setFormData(initialValueForm());
        setFile(null);
        setBanner(null);
    }
  
    return (
    <Form className='add-artist-form' onSubmit={onSubmit}>
        <Form.Field className='artist-banner'>
            <div {...getRootProps()} className="banner" style={{backgroundImage: `url('${banner}')`}}/>
            <Input {...getInputProps()}/>
            {!banner && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className='artist-avatar'>
            <div className='avatar' style={{backgroundImage: `url('${banner ? banner : AvatarArtista}')`}}/>
        </Form.Field>
        <Form.Field>
            <Input placeholder="Nombre del artista"
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </Form.Field>
        <Form.Field>
            <Input placeholder="Genero musical del artista"
                onChange={e => setFormData({...formData, generoMusical: e.target.value})}
            />
        </Form.Field>
        <Button type='submit' loading={isLoading}>
            Crear artista
        </Button>
    </Form>
  )
}

//Definimos los diferentes valores del artista
function initialValueForm() {
    return {
        name: "",
        generoMusical: ""
    }
}
