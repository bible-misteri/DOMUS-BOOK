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
        this.chapter = null;

    }

    async load() {

        this.book = BookService.getActive();

        this.chapter = ChapterService.getActive();

    }

    countWords(text) {

        if (!text) {

            return 0;

        }

        return text.trim().split(/\s+/).length;

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

        if (!this.chapter) {

            return `

<section class="domus-review">

<h1>Review</h1>

<p>Tidak ada bab aktif.</p>

</section>

`;

        }

        const text = this.chapter.content || "";

        const words = this.countWords(text);

        const chars = text.length;

        return `

<section class="domus-review">

<h1>Review Naskah</h1>

<h2>${this.book.title}</h2>

<h3>${this.chapter.title}</h3>

<div class="domus-review-summary">

<p><strong>Jumlah Kata :</strong> ${words}</p>

<p><strong>Jumlah Karakter :</strong> ${chars}</p>

</div>

<hr>

<article class="domus-review-content">

${text.replace(/\n/g,"<br>")}

</article>

</section>

`;

    }

}
