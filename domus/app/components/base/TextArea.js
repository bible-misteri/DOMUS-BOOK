/*
====================================================
DOMUS Framework v1.0
TextArea Component
====================================================
*/

import Component from "../../core/Component.js";

export default class TextArea extends Component {

    constructor({

        value = "",

        placeholder = "",

        rows = 12,

        onInput = null

    } = {}) {

        super();

        this.value = value;
        this.placeholder = placeholder;
        this.rows = rows;
        this.onInput = onInput;

    }

    template() {

        return `

<textarea

class="domus-textarea"

rows="${this.rows}"

placeholder="${this.placeholder}"

>${this.value}</textarea>

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
