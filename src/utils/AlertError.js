//Importación del toast
import {toast} from "react-toastify";

export default function alertErrors(type) {
    //Switch para diferentes errores 
    switch (type) {
        case "auth/wrong-password":
            toast.warning("La contraseña introducida no es correcta");
            break;
        case "auth/email-already-in-use":
            toast.warning("Este email ya está en uso");
            break;
        default:
            toast.warning("Error del servidor");
            break;
    }
}