/*
====================================================
DOMUS Framework v1.0
Base Page
====================================================
*/

import Component from "./Component.js";
import MainLayout from "../layouts/MainLayout.js";

export default class Page extends Component {

    constructor(props = {}) {

        super(props);

        this.title = "DOMUS";

    }

    async load() {

        // Override bila diperlukan

    }

    renderContent() {

        return "";

    }

    afterRender() {

    }

    render() {

        return new MainLayout(

            this.renderContent()

        ).render();

    }

    async initialize() {

        await this.load();

    }

}
