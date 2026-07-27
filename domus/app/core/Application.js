/*
====================================================
DOMUS Framework v1.0
Application Engine
====================================================
*/

class Application {

    constructor() {

        this.name = "DOMUS";

        this.version = "1.0.0";

        this.started = false;

        this.router = null;

        this.store = null;

        this.plugins = [];

    }

    registerRouter(router) {

        this.router = router;

    }

    registerStore(store) {

        this.store = store;

    }

    use(plugin) {

        this.plugins.push(plugin);

    }

    async start() {

        if(this.started){

            return;

        }

        this.started=true;

        console.log(

            `${this.name} ${this.version} starting...`

        );

        for(const plugin of this.plugins){

            if(plugin.install){

                await plugin.install(this);

            }

        }

        if(this.router){

            this.router.start();

        }

        console.log(

            "DOMUS Ready"

        );

    }

}

export default new Application();
