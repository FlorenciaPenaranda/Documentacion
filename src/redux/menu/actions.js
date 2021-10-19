export const GET = "[Menu] get";
export const GET_SUCCESS = "[Menu] get succes";
export const GET_ERROR = "[Menu] get error";

export const ADD = "[Menu] Add";
export const ADD_SUCCESS = "[Menu] Add Sucess";
export const ADD_ERROR = "[Menu] Add Error";

export const UPDATE_FIELD = "[Menu] Update Field";
export const UPDATE_FIELD_SUCCESS = "[Menu] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[Menu] Update Field Error";

export const getMenu = (options) => ({
    type: GET,
    options: options,
});

/* export const get = function (options) {
    return { type: GET, options: options }
}*/

export const add = (options) => ({
    type: ADD,
    options: options,
});

export const update = (item) => ({
    type: UPDATE_FIELD,
    item: item,
});
