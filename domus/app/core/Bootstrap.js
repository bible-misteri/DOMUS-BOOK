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

Router.register(

"home",

HomePage

);

Router.register(

"books",

BooksPage

);

Router.register(

"editor",

EditorPage

);

Router.register(

"review",

ReviewPage

);

Router.register(

"preview",

PreviewPage

);

Router.register(

"publish",

PublishPage

);
