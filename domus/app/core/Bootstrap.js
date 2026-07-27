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
