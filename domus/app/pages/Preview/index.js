/*
====================================================
DOMUS Preview Page
====================================================
*/

import Page from "../../core/Page.js";

import BookService from "../../services/BookService.js";
import ChapterService from "../../services/ChapterService.js";

export default class PreviewPage extends Page {

    constructor() {

        super();

        this.book = null;

        this.chapters = [];

    }

    async load() {

        this.book = BookService.getActive();

        if (!this.book) {

            return;

        }

        this.chapters = ChapterService.getAll();

    }

    escapeHtml(text = "") {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-preview">

<h1>Preview</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        const bookTitle =
            this.escapeHtml(
                this.book.title || "Tanpa Judul"
            );

        const content = this.chapters.map(
            (chapter, index) => {

                const title =
                    this.escapeHtml(
                        chapter.title || `Bab ${index + 1}`
                    );

                const text =
                    this.escapeHtml(
                        chapter.content || ""
                    );

                const formattedText =
                    text
                        ? text.replace(
                            /\n/g,
                            "<br>"
                        )
                        : `<em>Bab ini belum memiliki tulisan.</em>`;

                return `

<section class="domus-preview-chapter">

<div class="domus-preview-chapter-number">

Bab ${index + 1}

</div>

<h2>${title}</h2>

<div class="domus-paper-content">

${formattedText}

</div>

</section>

`;

            }
        ).join("");

        return `

<section class="domus-preview">

<div class="domus-paper">

<header class="domus-paper-header">

<h1>${bookTitle}</h1>

<p class="domus-preview-subtitle">

Preview Naskah

</p>

</header>

<div class="domus-paper-body">

${content}

</div>

</div>

</section>

`;

    }

}
