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

        this.chapter = null;

    }

    async load() {

        this.book = BookService.getActive();

        this.chapter = ChapterService.getActive();

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

        return `

<section class="domus-publish">

<h1>Publish Buku</h1>

<div class="domus-card">

<p><strong>Judul Buku</strong></p>

<p>${this.book.title}</p>

</div>

<div class="domus-card">

<p><strong>Bab Aktif</strong></p>

<p>

${this.chapter ? this.chapter.title : "-"}

</p>

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

<div id="publishResult"

class="domus-publish-result">

</div>

</section>

`;

    }

    afterRender() {

        const button =

            this.element.querySelector("#btnPublish");

        if (!button) {

            return;

        }

        button.addEventListener("click", async () => {

            const result =

                await PublishService.publish();

            const output =

                this.element.querySelector(

                    "#publishResult"

                );

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

        });

    }

}
