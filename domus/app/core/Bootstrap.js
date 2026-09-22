/*
====================================================
DOMUS Bootstrap
====================================================
*/

import Renderer from "./Renderer.js";
import Application from "./Application.js";
import Router from "./Router.js";
import routes from "../config/routes.js";

import AIService
    from "../services/AIService.js";

import MockAIProvider
    from "../services/AI/MockAIProvider.js";


export default async function Bootstrap() {


    /*
    ====================================================
    RENDERER
    ====================================================
    */

    Renderer.initialize("#app");


    /*
    ====================================================
    ROUTES
    ====================================================
    */

    routes.forEach(route => {

        Router.register(
            route.path,
            route.page
        );

    });


    /*
    ====================================================
    DOMUS AI
    ====================================================
    TEMPORARY MOCK PROVIDER
    ====================================================
    */

    const aiProvider =
        new MockAIProvider();


    AIService.configure(
        aiProvider
    );


    /*
    ====================================================
    APPLICATION
    ====================================================
    */

    Application.registerRouter(
        Router
    );


    /*
    ====================================================
    START APPLICATION
    ====================================================
    */

    await Application.start();

}
