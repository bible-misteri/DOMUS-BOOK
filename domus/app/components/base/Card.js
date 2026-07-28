/*
====================================================
DOMUS Framework v1.0
Card Component
====================================================
*/

import Component from "../../core/Component.js";

export default class Card extends Component {

    constructor({

        title = "",

        content = "",

        footer = ""

    } = {}) {

        super();

        this.title = title;
        this.content = content;
        this.footer = footer;

    }

    template() {

        return `

<div class="domus-card">

<div class="domus-card-header">

${this.title}

</div>

<div class="domus-card-body">

${this.content}

</div>

<div class="domus-card-footer">

${this.footer}

</div>

</div>

`;

    }

}
