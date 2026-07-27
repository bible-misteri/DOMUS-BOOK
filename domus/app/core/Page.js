/*
====================================================
DOMUS Framework v1.0
Base Page
====================================================
*/

import Component from "./Component.js";

export default class Page extends Component {

    constructor(props = {}) {

        super(props);

        this.title = "DOMUS";

    }

    async load() {

        // override

    }

    async beforeRender() {

        // override

    }

    async afterRender() {

        // override

    }

    async initialize() {

        await this.load();

        await this.beforeRender();

    }

}
