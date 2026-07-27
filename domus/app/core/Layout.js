/*
====================================================
DOMUS Framework v1.0
Base Layout
====================================================
*/

import Component from "./Component.js";

export default class Layout extends Component {

    constructor(content = "") {

        super();

        this.content = content;

    }

    setContent(content) {

        this.content = content;

        this.update();

    }

    template() {

        return `

<div class="domus-layout">

${this.content}

</div>

`;

    }

}
