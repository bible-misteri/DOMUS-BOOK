/*
====================================================
DOMUS Bootstrap
====================================================
*/

import Renderer from "./Renderer.js";

import Application from "./Application.js";

import Router from "./Router.js";

export default async function Bootstrap(){

    Renderer.initialize("#app");

    Application.registerRouter(Router);

    await Application.start();

}

/*
====================================================
DOMUS Bootstrap
====================================================
*/

import Renderer from "./Renderer.js";
import Application from "./Application.js";
import Router from "./Router.js";

import routes from "../config/routes.js";

export default async function Bootstrap() {

    Renderer.initialize("#app");

    routes.forEach(route => {

        Router.register(route.path, route.page);

    });

    Application.registerRouter(Router);

    await Application.start();

}
