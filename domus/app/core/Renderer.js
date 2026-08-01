/*
====================================================
DOMUS Framework v1.0
Renderer Engine
====================================================
*/

class Renderer {

    constructor() {

        this.root = null;

        this.currentComponent = null;

    }

    initialize(selector = "#app") {

        this.root = document.querySelector(selector);

        if (!this.root) {

            throw new Error(

                "DOMUS: Root element tidak ditemukan."

            );

        }

    }

    isInitialized() {

        return this.root !== null;

    }

    clear() {

        if (!this.root) {

            return;

        }

        this.root.innerHTML = "";

    }

    render(component) {

        if (!this.root) {

            throw new Error(

                "DOMUS: Renderer belum diinisialisasi."

            );

        }

        this.currentComponent = component;

        this.clear();

        component.mount(this.root);

        return true;

    }

    refresh() {

        if (!this.currentComponent) {

            return false;

        }

        return this.render(

            this.currentComponent

        );

    }

    getCurrentComponent() {

        return this.currentComponent;

    }

}

export default new Renderer();
