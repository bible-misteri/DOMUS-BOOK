/*
====================================================
DOMUS Publish Page
====================================================
*/

import Page from "../../core/Page.js";

import BookService from "../../services/BookService.js";
import ChapterService from "../../services/ChapterService.js";
import PublishService from "../../services/PublishService.js";

export default class PublishPage extends Page {

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

<section class="domus-publish">

<h1>Publish</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        const totalWords = this.chapters.reduce(

            (total, chapter) =>

                total + this.countWords(chapter.content || ""),

            0

        );

        return `

<section class="domus-publish">

<h1>Publish Buku</h1>

<div class="domus-card">

<p><strong>Judul Buku</strong></p>

<p>${this.book.title}</p>

</div>

<div class="domus-card">

<p><strong>Total Bab</strong></p>

<p>${this.chapters.length}</p>

</div>

<div class="domus-card">

<p><strong>Total Kata</strong></p>

<p>${totalWords}</p>

</div>

<div class="domus-card">

<p>

Naskah siap diproses untuk diterbitkan.

</p>

</div>

<button
id="btnPublish"
class="domus-btn domus-btn-primary">

Publish

</button>

<div
id="publishResult"
class="domus-publish-result">

</div>

</section>

`;

    }

    afterRender() {

        const button = this.element.querySelector("#btnPublish");

        if (!button) {

            return;

        }

        button.addEventListener("click", async () => {

            button.disabled = true;

            button.textContent = "Publishing...";

            const result = await PublishService.publish();

            const output = this.element.querySelector("#publishResult");

            output.innerHTML = `

<p>

<strong>Status :</strong>

${result.message}

</p>

<p>

<strong>Waktu :</strong>

${result.document.generatedAt}

</p>

`;

            button.disabled = false;

            button.textContent = "Publish";

        });

    }

}
