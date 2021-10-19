export const GET = "[Sectores] get";
export const GET_SUCCESS = "[Sectores] get succes";
export const GET_ERROR = "[Sectores] get error";

export const ADD = "[Sectores] Add";
export const ADD_SUCCESS = "[Sectores] Add Sucess";
export const ADD_ERROR = "[Sectores] Add Error";

export const UPDATE_FIELD = "[Sectores] Update Field";
export const UPDATE_FIELD_SUCCESS = "[Sectores] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[Sectores] Update Field Error";



export const getSectores = (options) => ({
    type: GET,
    options: options,
});

export const add = (options) => ({
    type: ADD,
    options: options,
})


/* export const get = function (options) {
    return { type: GET, options: options }
}*/

export const updateField = (id, name, value) => ({
    type: UPDATE_FIELD,
    id: id,
    name: name,
    value: value,
});


