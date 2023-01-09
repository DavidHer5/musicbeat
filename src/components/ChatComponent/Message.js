import React from 'react';
import { formatRelative } from 'date-fns';

import './Message.scss';

export default function Message(props) {

    const {createdAt, text, displayName, photoURL} = props;
    
    const formatDate = date => {
        let formattedDate = '';
        if (date) {

          formattedDate = formatRelative(date, new Date());

          formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
      };

  return (
    <div className='messages'>
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="imagenPerfil"
          width={45}
          height={45}
        />
      ) : null}
      <div className='messageContainer'>
        {displayName ? <p className='namePerfil'>{displayName}</p> : null}
        <p className='messagePerfil'>{text}</p>
        {createdAt?.seconds ? (
          <span className='messageFecha'>{formatDate(new Date(createdAt.seconds * 1000))}</span>
        ) : null}
      </div>
    </div>
  )
}
