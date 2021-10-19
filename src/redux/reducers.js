/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as sectoresReducer } from "./sectores/reducer";
import { reducer as menuReducer } from "./menu/reducer";
import { reducer as documentacionReducer } from "./documentacion/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as materialReducer } from "./material/reducer";

import { reducer as tareasReducer } from "./tareas/reducer";

export const rootReducer = (state = {}, action) => {
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        material: materialReducer(state.material, action),
        tareas: tareasReducer(state.tareas, action),
        sectores: sectoresReducer(state.sectores, action),
        menu: menuReducer(state.menu, action),
        documentacion: documentacionReducer(state.documentacion, action),
        autorizacion: autorizacionReducer(state.autorizacion, action),
    };
};
