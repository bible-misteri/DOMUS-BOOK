/*
====================================================
DOMUS Router
====================================================
*/

import Renderer from "./Renderer.js";

class Router{

    constructor(){

        this.routes=new Map();

        this.current=null;

    }

    register(name,page){

        this.routes.set(name,page);

    }

    async go(name){

        if(!this.routes.has(name)){

            console.error(

                "Route tidak ditemukan",

                name

            );

            return;

        }

        const Page=this.routes.get(name);

        const page=new Page();

        await page.initialize();

        Renderer.render(page);

        this.current=name;

        history.pushState(

            {page:name},

            "",

            "#"+name

        );

    }

    start(){

        const page=

            location.hash

            .replace("#","")

            ||"home";

        this.go(page);

        window.onpopstate=()=>{

            const p=

                location.hash

                .replace("#","")

                ||"home";

            this.go(p);

        };

    }

}

export default new Router();
