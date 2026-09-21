/*
====================================================
DOMUS Framework v1.0
AI Editor Panel
====================================================
*/

import Component from "../../core/Component.js";

export default class AIEditorPanel extends Component {

    constructor(props = {}) {

        super(props);

        this.onAction =
            props.onAction || (() => {});

    }

    template() {

        return `

<section class="domus-ai-panel">

    <div class="domus-ai-header">

        <div>

            <strong>✨ DOMUS AI</strong>

            <small>
                Asisten penulis
            </small>

        </div>

    </div>

    <div class="domus-ai-actions">

        <button
            type="button"
            data-ai-action="improve">

            Perbaiki Bahasa

        </button>

        <button
            type="button"
            data-ai-action="expand">

            Kembangkan

        </button>

        <button
            type="button"
            data-ai-action="summarize">

            Ringkas

        </button>

        <button
            type="button"
            data-ai-action="analyze">

            Analisis

        </button>

    </div>

    <div
        class="domus-ai-result"
        data-ai-result>

        <div class="domus-ai-empty">

            Hasil bantuan AI akan muncul di sini.

        </div>

    </div>

</section>

`;

    }

    afterRender() {

        this.element
            .querySelectorAll("[data-ai-action]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.onAction(
                            button.dataset.aiAction
                        );

                    }
                );

            });

    }

    showLoading() {

        const result =
            this.element.querySelector(
                "[data-ai-result]"
            );

        if (!result) {
            return;
        }

        result.innerHTML = `

<div class="domus-ai-loading">

    DOMUS AI sedang bekerja...

</div>

`;

    }

    showResult(text) {

        const result =
            this.element.querySelector(
                "[data-ai-result]"
            );

        if (!result) {
            return;
        }

        result.innerHTML = `

<div class="domus-ai-output">

    ${this.escapeHTML(text)}

</div>

`;

    }

    showError(message) {

        const result =
            this.element.querySelector(
                "[data-ai-result]"
            );

        if (!result) {
            return;
        }

        result.innerHTML = `

<div class="domus-ai-error">

    ${this.escapeHTML(message)}

</div>

`;

    }

    escapeHTML(value = "") {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

}
