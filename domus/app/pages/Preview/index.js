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

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-preview">

<h1>Preview</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        const content = this.chapters.map(chapter => `

<section class="domus-preview-chapter">

<h2>${chapter.title}</h2>

<div class="domus-paper-content">

${(chapter.content || "").replace(/\n/g,"<br>")}

</div>

</section>

<hr>

`).join("");

        return `

<section class="domus-preview">

<div class="domus-paper">

<header class="domus-paper-header">

<h1>${this.book.title}</h1>

</header>

${content}

</div>

</section>

`;

    }

}
