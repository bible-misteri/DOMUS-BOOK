/*
====================================================
DOMUS Framework v1.0
Input Component
====================================================
*/

import Component from "../../core/Component.js";

export default class Input extends Component {

    constructor({

        value = "",

        placeholder = "",

        type = "text",

        onInput = null

    } = {}) {

        super();

        this.value = value;
        this.placeholder = placeholder;
        this.type = type;
        this.onInput = onInput;

    }

    template() {

        return `

<input

class="domus-input"

type="${this.type}"

value="${this.value}"

placeholder="${this.placeholder}"

>

`;

    }

    afterRender() {

        if (!this.onInput) return;

        this.element.oninput = e => {

            this.value = e.target.value;

            this.onInput(this.value);

        };

    }

}
