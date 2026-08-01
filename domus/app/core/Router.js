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

        this.currentRoute = null;

        this.defaultRoute = "home";

        this.history = [];

    }

    register(path, PageClass) {

        this.routes.set(path, PageClass);

    }

    getCurrentRoute() {

        return this.currentRoute;

    }

    getCurrentPage() {

        return this.currentPage;

    }

    async go(path) {

        const PageClass = this.routes.get(path);

        if (!PageClass) {

            console.error(

                `DOMUS: Route "${path}" tidak ditemukan.`

            );

            return false;

        }

        this.currentRoute = path;

        this.history.push(path);

        this.currentPage = new PageClass();

        await this.currentPage.initialize();

        Renderer.render(this.currentPage);

        return true;

    }

    async start() {

        await this.go(this.defaultRoute);

    }

    async reload() {

        if (!this.currentRoute) {

            return;

        }

        await this.go(this.currentRoute);

    }

    async back() {

        if (this.history.length <= 1) {

            return;

        }

        this.history.pop();

        const previous = this.history.pop();

        if (previous) {

            await this.go(previous);

        }

    }

    has(path) {

        return this.routes.has(path);

    }

    getRoutes() {

        return [...this.routes.keys()];

    }

}

export default new Router();
