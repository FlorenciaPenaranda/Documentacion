export const GET = "[Material] get";
export const FETCH_SUCCESS = "[Material] fetch succes";
export const FETCH_ERROR = "[Material] fetch error";

export const UPDATE_FIELD = "[Material] Update Field";
export const UPDATE_FIELD_SUCCESS = "[Material] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[Material] Update Field Error";

export const SET_CURRENT_ITEM = "[Material] Set Current Item";
export const FILTRAR_CLASIF = "[Material] Filtrar Clasificaciones";

export const get = (options) => ({
    type: GET,
    options: options,
});


/* export const get = function (options) {
    return { type: GET, options: options }
}*/

export const updateField = (id, name, value) => ({
    type: UPDATE_FIELD,
    id: id,
    name: name,
    value: value,
});

export const setCurrentItem = (options) => ({
    type: SET_CURRENT_ITEM,
    options: options,
});

export const filtrar = (filtro) => ({
    type: FILTRAR_CLASIF,
    filtro: filtro,
});
