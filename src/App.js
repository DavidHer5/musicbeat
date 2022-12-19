//Importaciones
import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import LoggedLayout from "./Layouts/LoggedLayout";

//Este componente es el primero que se ejecuta en la aplicación

function App() {

  //Estados para cargar y recargar la página
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  //Comprobación para saber si el usuario esta logueado
  firebase.auth().onAuthStateChanged(currentUser => {
    if(!currentUser){
      setUser(null);
    } else {
      
      setUser(currentUser);
    }
    setIsLoading(false);

  });

  //Función para cargar 
  if(isLoading) {
    return null;
  }

    //Returnamos si el usuario esta logueado o no, y mostramos toast 
    return (
      <>
        {!user ? <Auth /> : <LoggedLayout user={user} setReloadApp={setReloadApp} />}
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover={false}
          />
      </>
    );
}

//Exportación del componente para poder reutilizarlo
export default App;
