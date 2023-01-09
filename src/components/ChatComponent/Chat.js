import React, {useState, useEffect} from 'react';
import firebase from '../../utils/Firebase';
import "firebase/firestore";
import "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import Message from './Message';

import './Chat.scss';

const db = firebase.firestore(firebase);

export default function Chat() {
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const user = firebase.auth().currentUser;

    const {uid, displayName, photoURL} = user;
    

    useEffect(() => {
        if (db){
            const unsubscribe = db.collection('messages').orderBy('createdAt').limit(100).onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMessages(data);
            })

            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        
        if (db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: serverTimestamp(),
                uid,
                displayName,
                photoURL
            });

            setNewMessage('');
        }
    }

  return (
    <div className='chat'>
        <div className='container'>
            <div className='container2'>
                <div className='header'>
                    <h2 className='titulo'>Bienvenido al chat grupal de MusicBeat</h2>
                    <h1 className='subtitulo'>Chatea con los demás mientras escuchas tu música preferida</h1>
                </div>
                <div className='channel'>
                    {messages.map(message => (
                        <div key={message.id} className="containerMessage">
                            <Message {...message} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <form
                onSubmit={handleOnSubmit}
                className="form"
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Escribir nuevo mensaje"
                    className='input'
                />
                <span></span>
                <button
                    type="submit"
                    disabled={!newMessage}
                    className='button'
                    >
                    Enviar
                </button>
            </form>
        </div>
    </div>
  )
}
