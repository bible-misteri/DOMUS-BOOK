/*
====================================================
DOMUS Framework v1.0
Main Layout
====================================================
*/

import Layout from "../core/Layout.js";

import Header from "../components/layout/Header.js";
import Sidebar from "../components/layout/Sidebar.js";
import Footer from "../components/layout/Footer.js";
import StatusBar from "../components/layout/StatusBar.js";

export default class MainLayout extends Layout {

    constructor(content = "") {

        super(content);

    }

    template() {

        const header = new Header().render();

        const sidebar = new Sidebar().render();

        const footer = new Footer().render();

        const status = new StatusBar().render();

        return `

<div class="domus-page">

${sidebar}

<div class="domus-main">

${header}

<main class="domus-content fade-in">

${this.content}

</main>

${status}

${footer}

</div>

</div>

`;

    }

}
