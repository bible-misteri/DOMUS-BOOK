/*
====================================================
DOMUS Framework v1.0
Renderer Engine
====================================================
*/

class Renderer {

    constructor() {

        this.root = null;

    }

    initialize(selector = "#app") {

        this.root = document.querySelector(selector);

        if (!this.root) {

            throw new Error("DOMUS: Root element tidak ditemukan.");

        }

    }

    clear() {

        this.root.innerHTML = "";

    }

    render(component) {

        this.clear();

        component.mount(this.root);

    }

}

export default new Renderer();
