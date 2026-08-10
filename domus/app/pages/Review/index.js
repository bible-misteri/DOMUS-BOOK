/*
====================================================
DOMUS Review Page
====================================================
*/

import Page from "../../core/Page.js";

import BookService from "../../services/BookService.js";
import ChapterService from "../../services/ChapterService.js";

export default class ReviewPage extends Page {

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

    countWords(text = "") {

        if (!text.trim()) {

            return 0;

        }

        return text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;

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

<section class="domus-review">

<h1>Review Naskah</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        let totalWords = 0;

        const chapters = this.chapters.map(
            (chapter, index) => {

                const text =
                    chapter.content || "";

                const words =
                    this.countWords(text);

                totalWords += words;

                const safeTitle =
                    this.escapeHtml(
                        chapter.title || `Bab ${index + 1}`
                    );

                const safeText =
                    this.escapeHtml(text);

                const content =
                    safeText
                        ? safeText.replace(
                            /\n/g,
                            "<br>"
                        )
                        : `<em>Bab ini belum memiliki tulisan.</em>`;

                return `

<article class="domus-review-chapter">

<h3>

Bab ${index + 1} — ${safeTitle}

</h3>

<p>

<strong>Jumlah Kata:</strong>

${words}

</p>

<div class="domus-review-content">

${content}

</div>

</article>

<hr>

`;

            }
        ).join("");

        return `

<section class="domus-review">

<h1>Review Naskah</h1>

<h2>${this.escapeHtml(this.book.title)}</h2>

<div class="domus-review-summary">

<p>

<strong>Total Bab:</strong>

${this.chapters.length}

</p>

<p>

<strong>Total Kata:</strong>

${totalWords}

</p>

</div>

<hr>

<div class="domus-review-chapters">

${chapters}

</div>

</section>

`;

    }

}
