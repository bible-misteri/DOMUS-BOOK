/*
====================================================
DOMUS Framework v1.0
Panel Component
====================================================
*/

import Component from "../../core/Component.js";

export default class Panel extends Component {

    constructor(content = "") {

        super();

        this.content = content;

    }

    template() {

        return `

<section class="domus-panel">

${this.content}

</section>

`;

    }

}
