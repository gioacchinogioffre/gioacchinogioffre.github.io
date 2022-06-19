import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Creamos una variable donde permitiremos usar la extensión Redux DevTools y donde pasaremos como parámetro nuestro middleWare.

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk))); // Creamos nuestro store pasando como primer argumento nuestro reducer, y como segundo argumento apllyMiddleware que será el intermediario entre nuestro store y reducer y nos permitirá hacer llamados a la API para luego pasarle la respuesta al reducer y que así llegue al store. Cuando una action retorna una function dispatch, se le está avisando al middleWare que posiblemente esto sea algo asíncrono y lo revisará.

export default store;