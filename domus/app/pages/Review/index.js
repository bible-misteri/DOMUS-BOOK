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

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-review">

<h1>Review</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        let totalWords = 0;

        const chapters = this.chapters.map(chapter => {

            const text = chapter.content || "";

            const words = this.countWords(text);

            totalWords += words;

            return `

<div class="domus-review-chapter">

<h3>${chapter.title}</h3>

<p><strong>Jumlah Kata :</strong> ${words}</p>

<div class="domus-review-content">

${text.replace(/\n/g,"<br>")}

</div>

<hr>

</div>

`;

        }).join("");

        return `

<section class="domus-review">

<h1>Review Naskah</h1>

<h2>${this.book.title}</h2>

<p><strong>Total Bab :</strong> ${this.chapters.length}</p>

<p><strong>Total Kata :</strong> ${totalWords}</p>

<hr>

${chapters}

</section>

`;

    }

}
