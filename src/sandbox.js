/** @format */

import {} from "../css/main.css";
import {} from "../css/media.css";
import {} from "../css/nunito.css";
import {} from "../css/fontSizes.css";
import {} from "../css/colors.css";
import {} from "../css/shadows.css";

import { store } from "./redux/store";
import { captureMedia } from "./redux/ui/actions";
import { goTo } from "./redux/routing/actions";
import { viewManager } from "./views/manager";
import { login } from "./redux/autorizacion/actions";
import { register as registerSW, activate as activateSW } from "./libs/serviceWorker";

//import { add, marcarComoRealizada, remove, filtrar, updateField, updateHora } from "./redux/tareas/actions";
import { getSectores } from "./redux/sectores/actions";
import { getMenu, update as updateMenu } from "./redux/menu/actions";
import { getDocumentacion, remove, add, update as updateDoc } from "./redux/documentacion/actions";

if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

/*store.dispatch(add("Aprender con Bruno", new Date()));
store.dispatch(add("Molestar a Manu", new Date(2021, 4, 17, 16, 30, 0)));
store.dispatch(add("Almorzar", new Date()));
store.dispatch(add("Pagar servicios", new Date()));
store.dispatch(add("Comprar cena", new Date()));
store.dispatch(add("Ir a kinesiología", new Date()));
store.dispatch(add("Escribirle a Gladys", new Date()));
store.dispatch(add("Sacar plata del cajero", new Date()));
store.dispatch(add("Comprar pintura", new Date()));
store.dispatch(add("Llamar a mamá", new Date()));

store.dispatch(remove("Almorzar"));

store.dispatch(updateHora("Aprender con Bruno", new Date(2021, 1, 1, 0, 0, 0)));

store.dispatch(marcarComoRealizada("Aprender con Bruno", true));
store.dispatch(marcarComoRealizada("Pagar servicios", true));
store.dispatch(marcarComoRealizada("Comprar cena", true));
store.dispatch(marcarComoRealizada("Ir a kinesiología", true));
store.dispatch(marcarComoRealizada("Escribirle a Gladys", true));
store.dispatch(marcarComoRealizada("Comprar pintura", true));

store.dispatch(filtrar());*/

//store.dispatch(getSectores({}));
//store.dispatch(getMenu({}));
//store.dispatch(getSectores({}));
//store.dispatch(getDocumentacion({}));

//store.dispatch(remove(2));
/*store.dispatch(add({
    Descripcion: "Hola",
    IdMenu: 1,
    IdSector: 1,
}));*/

/*store.dispatch(updateMenu(({
    Id: 1,
    Descripcion: "Hola",
    IdSector: 1,
})))*/

//setTimeout(() => { store.dispatch(goTo("instructivos")); }, 1000)

//store.dispatch(updateDoc(23, "Descripcion", "Descp. prueba"));
viewMode("main");
store.dispatch(captureMedia());
store.dispatch(goTo("documentacionMenu"));

/*if ("credentials" in navigator) {
    navigator.credentials
        .get({ password: true, mediation: "optional" })
        .catch((err) => console.log("navigator.credentials.get: No funciona en Firefox"))
        .then((cred) => {
            if (cred) {
                store.dispatch(login(cred.id, cred.password, true));
            } else {
                store.dispatch(goTo("login"));
            }
        });
} else {
    store.dispatch(goTo("login"));
}*/

window["__FuncionesPublicas__"] = {
    login: (email, password) => {
        store.dispatch(login(email, password));
    },
    cambioClave: () => {
        store.dispatch(goTo("cambioClave"));
    },
    miembro: () => {
        store.dispatch(goTo("serMiembro"));
    },
};
