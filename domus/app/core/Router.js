/*
====================================================
DOMUS Framework v1.0
Router
====================================================
*/

import Renderer from "./Renderer.js";

class Router {

    constructor() {

        this.routes = new Map();

        this.currentPage = null;

        this.defaultRoute = "home";

    }

    register(path, PageClass) {

        this.routes.set(path, PageClass);

    }

    async go(path) {

        const PageClass = this.routes.get(path);

        if (!PageClass) {

            console.error(

                `Route "${path}" tidak ditemukan.`

            );

            return;

        }

        this.currentPage = new PageClass();

        await this.currentPage.initialize();

        Renderer.render(

            this.currentPage

        );

    }

    async start() {

        await this.go(

            this.defaultRoute

        );

    }

    reload() {

        if (!this.currentPage) {

            return;

        }

        this.go(

            [...this.routes.entries()]

            .find(

                ([, page]) =>

                this.currentPage instanceof page

            )?.[0] || this.defaultRoute

        );

    }

}

export default new Router();
