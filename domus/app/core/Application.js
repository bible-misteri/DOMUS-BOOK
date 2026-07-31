/*
====================================================
DOMUS Framework v1.0
Application
====================================================
*/

class Application {

    constructor() {

        this.router = null;

        this.started = false;

    }

    registerRouter(router) {

        this.router = router;

    }

    async start() {

        if (this.started) {

            return;

        }

        this.started = true;

        if (!this.router) {

            throw new Error(

                "Router belum didaftarkan."

            );

        }

        await this.router.start();

    }

}

export default new Application();
