/*
====================================================
DOMUS Framework v1.0
Sidebar Component
====================================================
*/

import Component from "../../core/Component.js";
import Router from "../../core/Router.js";
import menus from "../../config/menus.js";

export default class Sidebar extends Component {

    template() {

        const items = menus.map(menu => `

<button class="domus-menu-item"

data-page="${menu.page}">

${menu.title}

</button>

`).join("");

        return `

<nav class="domus-sidebar">

${items}

</nav>

`;

    }

    afterRender() {

        this.element
            .querySelectorAll("[data-page]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    Router.go(

                        button.dataset.page

                    );

                });

            });

    }

}
