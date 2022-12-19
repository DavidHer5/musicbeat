//Importaciones
import React, {useState, useEffect, useCallback} from 'react';
import {Form, Input, Button, Image, Dropdown} from "semantic-ui-react";
import {useDropzone} from "react-dropzone";
import {map} from "lodash";
import {toast} from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import NoImage from "../../../assets/png/no-image.png";
import firebase from '../../../utils/Firebase';
import "firebase/firestore";
import "firebase/storage";

//Importación del Sass
import "./AddAlbumForm.scss";

//Inicializo la base de datos
const db = firebase.firestore(firebase);

export default function AddAlbumForm(props) {
    //Declaramos los diferentes estados para mostrar el modal, traer los datos de artistas y el cargar.
    const {setShowModal} = props;
    const [formData, setFormData] = useState(initialValueForm());
    const [artists, setArtists] = useState([]);
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //Hago la petición a firestore para obtener todos los artistas
    useEffect(() => {
        db.collection("artists").get().then(response => {
            const arrayArtists = [];
            map(response?.docs, artist => {
                const data = artist.data();
                arrayArtists.push({
                    key: artist.id,
                    value: artist.id,
                    text: data.name
                })
            });
            setArtists(arrayArtists);
        });
    }, []);


    //Arrastrar imagenes para guardarlas en el modal
    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);
        setAlbumImage(URL.createObjectURL(file));
    }, []);

    //función para pasar las imagenes que solo sean con .jpeg y .png
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    //Cargar imagen en la base de datos
    const uploadImage = (fileName => {
        const ref = firebase.storage().ref().child(`album/${fileName}`);
        return ref.put(file);
    })

    //función para subir todos los datos validados
    const onSubmit = () => {
        if(!formData.name || !formData.artist || !file) {
            toast.warning("Debe rellenar todos los campos que se muestran debajo");
        }else {
            setIsLoading(true);
            const fileName = uuidv4();
            uploadImage(fileName).then(() => {
                db.collection("albums").add({
                    name: formData.name,
                    artist: formData.artist,
                    banner: fileName
                }).then(() => {
                    toast.success("Album creado correctamente")
                    clearForm();
                    setIsLoading(false);
                    setShowModal(false);
                }).catch(() => {
                    toast.warning("Error al crear el album")
                    setIsLoading(false);
                })
            }).catch(() => {
                toast.warning("eerrror al subir la imagen")
                setIsLoading(false);
            })
        }
    }

    //función para limpiar
    const clearForm = () => {
        setFormData(initialValueForm());
        setFile(null);
        setAlbumImage(null);
    }

  return (
    <div>
      <Form className='add-album-form' onSubmit={onSubmit}>
        <Form.Group>
            <Form.Field className='album-avatar' width={5}>
                <div 
                    {...getRootProps()}
                    className='avatar'
                    style={{backgroundImage: `url('${albumImage}')`}}
                />
                <Input {...getInputProps()}/>
                {!albumImage && <Image src={NoImage} />}
            </Form.Field>
            <Form.Field className='album-texto' width={11}>
                <Input placeholder="Nombre del álbum"
                    onChange={e => setFormData({
                        ...formData, name: e.target.value
                    })}/>

                <Dropdown 
                    placeholder='El artista del album es: ' 
                    fluid
                    search
                    selection
                    options={artists} 
                    lazyLoad
                    onChange={(e, data) => setFormData({ ...formData, artist: data.value})}
                />
            </Form.Field>
        </Form.Group>
        <Button type='submit' loading={isLoading}>
            Crear Album
        </Button>
      </Form>
    </div>
  )
}

//Definimos los diferentes valores del album
function initialValueForm(){
    return{
        name: "",
        artist: ""
    }
}
