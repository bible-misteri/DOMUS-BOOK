/*
====================================================
DOMUS Framework v1.0
Button Component
====================================================
*/

import Component from "../../core/Component.js";

export default class Button extends Component {

    constructor({

        label = "Button",

        type = "primary",

        icon = "",

        disabled = false,

        onClick = null

    } = {}) {

        super();

        this.label = label;
        this.type = type;
        this.icon = icon;
        this.disabled = disabled;
        this.onClick = onClick;

    }

    template() {

        return `

<button class="domus-btn domus-btn-${this.type}"

${this.disabled ? "disabled" : ""}>

${this.icon}

<span>${this.label}</span>

</button>

`;

    }

    afterRender() {

        if (!this.onClick) return;

        this.element.onclick = this.onClick;

    }

}
