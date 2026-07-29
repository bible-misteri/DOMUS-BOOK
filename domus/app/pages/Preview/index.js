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

        this.chapter = null;

    }

    async load() {

        this.book = BookService.getActive();

        this.chapter = ChapterService.getActive();

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

        if (!this.chapter) {

            return `

<section class="domus-preview">

<h1>Preview</h1>

<p>Tidak ada bab aktif.</p>

</section>

`;

        }

        return `

<section class="domus-preview">

<div class="domus-paper">

<header class="domus-paper-header">

<h1>${this.book.title}</h1>

<h2>${this.chapter.title}</h2>

</header>

<article class="domus-paper-content">

${this.chapter.content.replace(/\n/g,"<br>")}

</article>

</div>

</section>

`;

    }

}
