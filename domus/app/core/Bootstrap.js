/*
====================================================
DOMUS Bootstrap
====================================================
*/

export default async function Bootstrap() {
    document.querySelector("#app").innerHTML =
        "<h1>Bootstrap BERHASIL dimuat</h1>";
}

export default async function Bootstrap() {

    Renderer.initialize("#app");

    routes.forEach(route => {
        Router.register(route.path, route.page);
    });

    Application.registerRouter(Router);

    await Application.start();

}
