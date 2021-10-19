/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApi = SERVICE_LOGIN_URL + "/api";

let webApiExpedientes = SERVICE_URL; //url del dominio

const documentacionOdataFactory = ODataFetchFactory({
    //fetch del dominio
    fetch: fetch,
    domain: webApiExpedientes,
});

export const sectoresFetch = ODataEntity(documentacionOdataFactory, "Sectores"); //fetch de las entidades
export const menuFetch = ODataEntity(documentacionOdataFactory, "Menu");
export const documentacionFetch = ODataEntity(documentacionOdataFactory, "Documentacion");
export const loginFetch = fetchFactory(webApi, "LoginOS");
export const agregarImagenFetch = ODataEntity(documentacionOdataFactory, "AgregarImagen");
