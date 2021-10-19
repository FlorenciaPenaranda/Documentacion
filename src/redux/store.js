/** @format */

import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import { rootReducer as reducers } from "./reducers";
import { middleware, middleware as ui } from "./ui/middleware";
import { middleware as api } from "./api/middleware";
import { middleware as rest } from "./rest/middleware";
import { middleware as route } from "./routing/middleware";
import { middleware as sectores } from "./sectores/middleware";
import { middleware as menu } from "./menu/middleware";
import { middleware as documentacion } from "./documentacion/middleware";
import { middleware as autorizacion } from "./autorizacion/middleware";
import { middleware as material } from "./material/middleware";
import { middleware as tareas } from "./tareas/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [api, rest, ...ui, ...route, ...autorizacion, ...sectores, ...menu, ...documentacion, ...material, ...tareas];

if (process.env.NODE_ENV !== "production") {
    mdw = [...mdw, logger];
}

const initialData = {};

export const store = createStore(reducers, initialData, composeEnhancers(applyMiddleware(...mdw)));
