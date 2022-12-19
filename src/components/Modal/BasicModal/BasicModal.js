//Importaciones
import React from 'react';
import {Modal, Icon} from "semantic-ui-react";

//Importación del Sass
import "./BasicModal.scss";

export default function BasicModal(props) {
    //Estados
    const {show, setShow, title, children} = props;

    
    const onClose = () => {
        setShow(false);
    }


  return (
    <Modal open={show} onClose={onClose} className="basic-modal" size="tiny">
        <Modal.Header>
            <h3>{title}</h3>
            <Icon name="close" onClick={onClose} />
        </Modal.Header>
        <Modal.Content>
            {children}
        </Modal.Content>
    </Modal>
  )
}
