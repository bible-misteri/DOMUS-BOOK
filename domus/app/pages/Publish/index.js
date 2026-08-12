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
    TOTAL KATA
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
    VALIDASI
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
     TOTAL BAB
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
     TOTAL KATA
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


        button.addEventListener(
            "click",
            async () => {

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
                    PUBLISH
                    ========================================
                    */

                    const result =
                        await PublishService.publish();


                    const document =
                        result.document;

                    /*
                    ========================================
                    TOC OTOMATIS
                    ========================================
                    */

                    let tocHTML = "";

                    if (
                        document &&
                        Array.isArray(document.toc)
                    ) {

                        tocHTML =
                            document.toc.map(
                                (item) => {

                                    return `

                    <div
                    style="
                    display:flex;
                    justify-content:space-between;
                    padding:8px 0;
                    border-bottom:1px solid #eee;
                    ">

                    <span>

                    ${item.number}.
                    ${item.title}

                    </span>

                    <span>

                    ${item.wordCount} kata

                      </span>

                      </div>

                    `;

                                }

                            ).join("");

                    }


                    /*
                    ========================================
                    TAMPILKAN STATUS
                    ========================================
                    */

                    let chaptersHTML = "";


                    if (
                        document &&
                        Array.isArray(
                            document.chapters
                        )
                    ) {

                        chaptersHTML =
                            document.chapters.map(
                                (chapter) => {

                                    const content =
                                        chapter.content || "";


                                    const safeContent =
                                        content
                                            .replace(
                                                /&/g,
                                                "&amp;"
                                            )
                                            .replace(
                                                /</g,
                                                "&lt;"
                                            )
                                            .replace(
                                                />/g,
                                                "&gt;"
                                            )
                                            .replace(
                                                /\n/g,
                                                "<br>"
                                            );


                                    return `

<div
class="domus-card"
style="margin-top:12px;">

<h3>

Bab ${chapter.number || ""}

</h3>

<p>

<strong>Judul:</strong>

${chapter.title}

</p>

<p>

<strong>Jumlah Kata:</strong>

${chapter.wordCount}

</p>

<div
style="
padding:12px;
margin-top:8px;
border:1px solid #ddd;
border-radius:6px;
">

${safeContent}

</div>

</div>

`;

                                }

                            ).join("");

                    }


                    /*
                    ========================================
                    HASIL DEBUG
                    ========================================
                    */

                    output.innerHTML = `

<div class="domus-card">

<h3>

✓ Publish Berhasil

</h3>

<p>

<strong>Status:</strong>

${result.message}

</p>

<p>

<strong>Waktu:</strong>

${document.generatedAt}

</p>

</div>


<div class="domus-card">

<h3>

🔎 Struktur Dokumen Publish

</h3>

<p>

<strong>Judul:</strong>

${document.book.title}

</p>

<p>

<strong>Total Bab:</strong>

${document.totalChapters}

</p>

<p>

<strong>Total Kata:</strong>

${document.totalWords}

</p>

</div>


<div>

${chaptersHTML}

</div>

`;

                    if (status) {

                        status.innerHTML = `

<p>

<strong>Status Naskah</strong>

</p>

<p>

✓ Seluruh naskah berhasil dibangun.

</p>

`;

                    }

                }


                catch (error) {

                    console.error(
                        "DOMUS Publish Error:",
                        error
                    );


                    output.innerHTML = `

<div class="domus-card">

<p>

<strong>Status:</strong>

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


                button.disabled = false;

                button.textContent =
                    "🚀 Publish";

            }

        );

    }

}
