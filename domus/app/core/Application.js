/*
====================================================
DOMUS Framework v1.0
Application
====================================================
*/

import Store from "./Store.js";

class Application {

    constructor() {

        this.router = null;

        this.started = false;

    }

    registerRouter(router) {

        this.router = router;

    }

    isStarted() {

        return this.started;

    }

    async start() {

        if (this.started) {

            return false;

        }

        if (!this.router) {

            throw new Error(

                "DOMUS: Router belum didaftarkan."

            );

        }

        Store.initialize();

        this.started = true;

        await this.router.start();

        console.log(

            "DOMUS Framework siap."

        );

        return true;

    }

    async restart() {

        this.started = false;

        return await this.start();

    }

}

export default new Application();
