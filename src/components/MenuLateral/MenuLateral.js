//Importaciones
import React, {useState, useEffect} from 'react';
import {Menu, Icon} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import BasicModal from '../Modal/BasicModal';
import AddArtistForm from '../Artists/AddArtistForm';
import AddAlbumForm from '../Albums/AddAlbumForm/AddAlbumForm';
import AddSongForm from '../Songs/AddSongForm';
import "./MenuLateral.scss";

import firebase from "../../utils/Firebase";

const db = firebase.firestore(firebase);

async function isUserAdmin(uid) {
    const response = await db.collection("administradores").doc(uid).get();
    return response.exists;
}

//Importación del Sass



function MenuLateral(props) {
    //Estados para que se muestre el modal, el titulo y su contenido
    const {user} = props;
    const [activeMenu, setActiveMenu] = useState("home");
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [userAdmin, setUserAdmin] = useState(false);


    useEffect(() => {
        isUserAdmin(user.uid).then(response => {
            setUserAdmin(response);
        })
    }, [user])

    //Función para saber que menú está seleccionado
    const handlerMenu = (e, menu) => {
        setActiveMenu(menu.name);
    }

    

    //Función para saber que menú de creación de canción, artista o album esta seleccionado y llamar a su clase correspondiente.
    const handlerModal = (type) => {
        switch (type) {
            case "artist":
                setTitleModal("Nuevo artista");
                setContentModal(<AddArtistForm setShowModal={setShowModal}/>);
                setShowModal(true);
                break;
            case "song":
                setTitleModal("Nueva canción");
                setContentModal(<AddSongForm setShowModal={setShowModal} />);
                setShowModal(true);
                break; 
            case "album":
                setTitleModal("Nuevo Álbum");
                setContentModal(<AddAlbumForm setShowModal={setShowModal}/>);
                setShowModal(true);
                break; 
                
            default:
                setTitleModal(null);
                setContentModal(null);
                setShowModal(false);
                break;
        }
    }


    return (
        <>
       <Menu className='menu-lateral' vertical>
            <div className='top'>
                <Menu.Item as={Link} 
                    to="/" name="home" 
                    active={activeMenu === "home"}
                    onClick={handlerMenu}
                    >
                    <Icon name="home" /> Inicio
                </Menu.Item>
                <Menu.Item as={Link} 
                    to="/artists" 
                    name="artists" 
                    active={activeMenu === "artists"}
                    onClick={handlerMenu}
                    >
                    <Icon name="user" /> Artistas
                </Menu.Item>
                <Menu.Item as={Link} 
                    to="/albums" 
                    name="albums" 
                    active={activeMenu === "albums"}
                    onClick={handlerMenu}
                    >
                    <Icon name="folder open outline" /> Albumes
                </Menu.Item>
                <Menu.Item as={Link} 
                    to="/songs" 
                    name="songs" 
                    active={activeMenu === "songs"}
                    onClick={handlerMenu}
                    >
                    <Icon name="music" /> Canciones
                </Menu.Item>
                <Menu.Item as={Link} 
                    to="/chat" 
                    name="chat" 
                    active={activeMenu === "chat"}
                    onClick={handlerMenu}
                    >
                    <Icon name="paper plane outline" /> Chats
                </Menu.Item>
            </div>
            {userAdmin && (  
            <div className='footer'>
                <Menu.Item onClick={() => handlerModal("artist")}>
                    <Icon name="plus square outline" /> Nuevo Artista
                </Menu.Item>
                <Menu.Item onClick={() => handlerModal("song")}>
                    <Icon name="plus square outline" /> Nueva Canción
                </Menu.Item>
                <Menu.Item onClick={() => handlerModal("album")}>
                    <Icon name="plus square outline" /> Nuevo Álbum
                </Menu.Item>
            </div>
            )}
       </Menu>
       <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
       </BasicModal>
       </>
    )
}

export default withRouter(MenuLateral);
