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

    /*
    ====================================================
    LOAD
    ====================================================
    */

    async load() {

        this.book =
            BookService.getActive();

        if (!this.book) {

            return;

        }

        this.chapters =
            ChapterService.getAll();

    }

    /*
    ====================================================
    HITUNG KATA
    ====================================================
    */

    countWords(text = "") {

        const cleanText =
            text.trim();

        if (!cleanText) {

            return 0;

        }

        return cleanText
            .split(/\s+/)
            .filter(Boolean)
            .length;

    }

    /*
    ====================================================
    HITUNG TOTAL KATA
    ====================================================
    */

    getTotalWords() {

        return this.chapters.reduce(

            (total, chapter) => {

                return total +
                    this.countWords(
                        chapter.content || ""
                    );

            },

            0

        );

    }

    /*
    ====================================================
    PEMERIKSAAN NASKAH
    ====================================================
    */

    getValidation() {

        const hasBook =
            !!this.book;

        const hasChapters =
            this.chapters.length > 0;

        const totalWords =
            this.getTotalWords();

        const hasContent =
            totalWords > 0;

        return {

            hasBook,

            hasChapters,

            hasContent,

            ready:
                hasBook &&
                hasChapters &&
                hasContent

        };

    }

    /*
    ====================================================
    RENDER
    ====================================================
    */

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-publish">

<h1>Publish</h1>

<p>Tidak ada buku aktif.</p>

</section>

`;

        }

        const totalWords =
            this.getTotalWords();

        const validation =
            this.getValidation();

        /*
        ====================================================
        STATUS PEMERIKSAAN
        ====================================================
        */

        const bookStatus =
            validation.hasBook
                ? "✓ Buku aktif"
                : "✗ Tidak ada buku";

        const chapterStatus =
            validation.hasChapters
                ? "✓ Ada bab"
                : "✗ Belum ada bab";

        const contentStatus =
            validation.hasContent
                ? "✓ Naskah memiliki isi"
                : "✗ Naskah masih kosong";

        /*
        ====================================================
        TOMBOL PUBLISH
        ====================================================
        */

        const publishButton =
            validation.ready
                ? `

<button
id="btnPublish"
class="domus-btn domus-btn-primary"
type="button">

🚀 Publish

</button>

`
                : `

<button
id="btnPublish"
class="domus-btn domus-btn-primary"
type="button"
disabled>

🚀 Publish

</button>

`;

        return `

<section class="domus-publish">

<h1>Publish Buku</h1>

<p>

Periksa naskah sebelum diterbitkan.

</p>


<!-- ================================================
     INFORMASI BUKU
================================================ -->

<div class="domus-card">

<p>
<strong>Judul Buku</strong>
</p>

<p>
${this.book.title}
</p>

</div>


<!-- ================================================
     JUMLAH BAB
================================================ -->

<div class="domus-card">

<p>
<strong>Total Bab</strong>
</p>

<p>
${this.chapters.length}
</p>

</div>


<!-- ================================================
     JUMLAH KATA
================================================ -->

<div class="domus-card">

<p>
<strong>Total Kata</strong>
</p>

<p>
${totalWords}
</p>

</div>


<!-- ================================================
     PEMERIKSAAN
================================================ -->

<div class="domus-card">

<h3>
Pemeriksaan Naskah
</h3>

<p>
${bookStatus}
</p>

<p>
${chapterStatus}
</p>

<p>
${contentStatus}
</p>

</div>


<!-- ================================================
     STATUS
================================================ -->

<div
id="publish-status"
class="domus-card">

<p>

<strong>Status Naskah</strong>

</p>

<p>

${
    validation.ready
        ? "✓ Naskah siap diproses."
        : "⚠ Naskah belum siap diterbitkan."
}

</p>

</div>


<!-- ================================================
     BUTTON
================================================ -->

${publishButton}


<!-- ================================================
     HASIL PUBLISH
================================================ -->

<div
id="publishResult"
class="domus-publish-result">

</div>


</section>

`;

    }

    /*
    ====================================================
    AFTER RENDER
    ====================================================
    */

    afterRender() {

        const button =
            this.element.querySelector(
                "#btnPublish"
            );

        if (!button) {

            return;

        }

        /*
        ====================================================
        KLIK PUBLISH
        ====================================================
        */

        button.addEventListener(
            "click",
            async () => {

                /*
                --------------------------------------------
                CEGAH KLIK GANDA
                --------------------------------------------
                */

                if (button.disabled) {

                    return;

                }

                button.disabled = true;

                button.textContent =
                    "Publishing...";


                const output =
                    this.element.querySelector(
                        "#publishResult"
                    );

                const status =
                    this.element.querySelector(
                        "#publish-status"
                    );


                if (status) {

                    status.innerHTML = `

<p>

<strong>Status Naskah</strong>

</p>

<p>

⏳ Sedang diproses...

</p>

`;

                }


                try {

                    /*
                    ========================================
                    PANGGIL PUBLISH SERVICE
                    ========================================
                    */

                    const result =
                        await PublishService.publish();


                    /*
                    ========================================
                    TAMPILKAN HASIL
                    ========================================
                    */

                    output.innerHTML = `

<div class="domus-card">

<p>

<strong>Status :</strong>

${result.message}

</p>

<p>

<strong>Waktu :</strong>

${result.document.generatedAt}

</p>

</div>

`;


                    if (status) {

                        status.innerHTML = `

<p>

<strong>Status Naskah</strong>

</p>

<p>

✓ Publish berhasil diproses.

</p>

`;

                    }

                }

                catch (error) {

                    /*
                    ========================================
                    JIKA PUBLISH GAGAL
                    ========================================
                    */

                    console.error(
                        "DOMUS Publish Error:",
                        error
                    );


                    output.innerHTML = `

<div class="domus-card">

<p>

<strong>Status :</strong>

❌ Publish gagal.

</p>

<p>

${error.message || error}

</p>

</div>

`;


                    if (status) {

                        status.innerHTML = `

<p>

<strong>Status Naskah</strong>

</p>

<p>

❌ Terjadi kesalahan saat publish.

</p>

`;

                    }

                }


                /*
                --------------------------------------------
                KEMBALIKAN TOMBOL
                --------------------------------------------
                */

                button.disabled = false;

                button.textContent =
                    "🚀 Publish";

            }

        );

    }

}
