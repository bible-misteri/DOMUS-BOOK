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

            this.chapters = [];

            return;

        }

        this.chapters =
            ChapterService.getAll() || [];

    }


    /*
    ====================================================
    ESCAPE HTML
    ====================================================
    */

    escapeHTML(value = "") {

        return String(value)

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
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /*
    ====================================================
    HITUNG KATA
    ====================================================
    */

    countWords(text = "") {

        const cleanText =
            String(text).trim();

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
                        chapter?.content || ""
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

    <p>
        Tidak ada buku aktif.
    </p>

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


    <!-- =========================================
         INFORMASI BUKU
    ========================================== -->

    <div class="domus-card">

        <p>
            <strong>Judul Buku</strong>
        </p>

        <p>
            ${this.escapeHTML(this.book.title || "Tanpa Judul")}
        </p>

    </div>


    <!-- =========================================
         TOTAL BAB
    ========================================== -->

    <div class="domus-card">

        <p>
            <strong>Total Bab</strong>
        </p>

        <p>
            ${this.chapters.length}
        </p>

    </div>


    <!-- =========================================
         TOTAL KATA
    ========================================== -->

    <div class="domus-card">

        <p>
            <strong>Total Kata</strong>
        </p>

        <p>
            ${totalWords}
        </p>

    </div>


    <!-- =========================================
         PEMERIKSAAN NASKAH
    ========================================== -->

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


    <!-- =========================================
         STATUS
    ========================================== -->

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


    <!-- =========================================
         BUTTON PUBLISH
    ========================================== -->

    ${publishButton}


    <!-- =========================================
         HASIL PUBLISH
    ========================================== -->

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


                /*
                ========================================
                LOCK BUTTON
                ========================================
                */

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


                    /*
                    ========================================
                    VALIDASI HASIL
                    ========================================
                    */

                    if (
                        !result ||
                        !result.document
                    ) {

                        throw new Error(
                            "Publish berhasil tetapi dokumen manuscript tidak ditemukan."
                        );

                    }


                    const document =
                        result.document;


                    /*
                    ========================================
                    DATA AMAN
                    ========================================
                    */

                    const documentBook =
                        document.book || this.book || {};

                    const documentChapters =
                        Array.isArray(
                            document.chapters
                        )

                            ? document.chapters

                            : [];


                    /*
                    ========================================
                    TOTAL BAB
                    ========================================
                    */

                    const totalChapters =
                        Number.isFinite(
                            document.totalChapters
                        )

                            ? document.totalChapters

                            : documentChapters.length;


                    /*
                    ========================================
                    TOTAL KATA
                    ========================================
                    */

                    const totalWords =
                        Number.isFinite(
                            document.totalWords
                        )

                            ? document.totalWords

                            : documentChapters.reduce(

                                (total, chapter) => {

                                    return total +

                                        this.countWords(
                                            chapter?.content || ""
                                        );

                                },

                                0

                            );


                    /*
                    ========================================
                    TOC
                    ========================================
                    */

                    let tocItems = [];


                    /*
                    Prioritas:
                    1. document.toc
                    2. document.chapters
                    */

                    if (
                        Array.isArray(
                            document.toc
                        ) &&
                        document.toc.length > 0
                    ) {

                        tocItems =
                            document.toc.map(

                                (item, index) => {

                                    const title =
                                        item?.title ||
                                        `Bab ${index + 1}`;


                                    const wordCount =
                                        Number.isFinite(
                                            item?.wordCount
                                        )

                                            ? item.wordCount

                                            : 0;


                                    return {

                                        number:
                                            index + 1,

                                        id:
                                            item?.id || "",

                                        title,

                                        wordCount

                                    };

                                }

                            );

                    }

                    else {

                        tocItems =
                            documentChapters.map(

                                (chapter, index) => {

                                    const content =
                                        chapter?.content || "";


                                    return {

                                        number:
                                            index + 1,

                                        id:
                                            chapter?.id || "",

                                        title:
                                            chapter?.title ||
                                            `Bab ${index + 1}`,

                                        wordCount:
                                            this.countWords(
                                                content
                                            )

                                    };

                                }

                            );

                    }


                    /*
                    ========================================
                    RENDER TOC
                    ========================================
                    */

                    let tocHTML = "";


                    if (tocItems.length > 0) {

                        tocHTML =
                            tocItems.map(

                                (item) => {

                                    return `

<div
    style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:16px;
        padding:10px 0;
        border-bottom:1px solid #eee;
    ">

    <span>

        <strong>
            ${item.number}.
        </strong>

        ${this.escapeHTML(
            item.title
        )}

    </span>

    <span
        style="
            white-space:nowrap;
            font-size:0.9em;
            opacity:0.75;
        ">

        ${item.wordCount} kata

    </span>

</div>

`;

                                }

                            ).join("");

                    }

                    else {

                        tocHTML = `

<p>

    Belum ada bab dalam Daftar Isi.

</p>

`;

                    }


                    /*
                    ========================================
                    RENDER CHAPTER
                    ========================================
                    */

                    let chaptersHTML = "";


                    if (
                        documentChapters.length > 0
                    ) {

                        chaptersHTML =
                            documentChapters.map(

                                (chapter, index) => {

                                    const number =
                                        index + 1;


                                    const title =
                                        chapter?.title ||
                                        `Bab ${number}`;


                                    const content =
                                        String(
                                            chapter?.content || ""
                                        );


                                    const wordCount =
                                        this.countWords(
                                            content
                                        );


                                    const safeContent =
                                        this.escapeHTML(
                                            content
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

        Bab ${number}

    </h3>


    <p>

        <strong>Judul:</strong>

        ${this.escapeHTML(
            title
        )}

    </p>


    <p>

        <strong>Jumlah Kata:</strong>

        ${wordCount}

    </p>


    <div
        style="
            padding:12px;
            margin-top:8px;
            border:1px solid #ddd;
            border-radius:6px;
            line-height:1.6;
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
                    HASIL PUBLISH
                    ========================================
                    */

                    output.innerHTML = `

<div class="domus-card">

    <h3>

        ✓ Publish Berhasil

    </h3>


    <p>

        <strong>Status:</strong>

        ${this.escapeHTML(
            result.message ||
            "Publish seluruh naskah berhasil."
        )}

    </p>


    <p>

        <strong>Waktu:</strong>

        ${this.escapeHTML(
            document.generatedAt ||
            new Date().toISOString()
        )}

    </p>

</div>


<!-- =========================================
     DAFTAR ISI OTOMATIS
========================================== -->

<div class="domus-card">

    <h3>

        📑 Daftar Isi

    </h3>

    ${tocHTML}

</div>


<!-- =========================================
     STRUKTUR MANUSCRIPT
========================================== -->

<div class="domus-card">

    <h3>

        🔎 Struktur Dokumen Publish

    </h3>


    <p>

        <strong>Judul:</strong>

        ${this.escapeHTML(
            documentBook.title ||
            "Tanpa Judul"
        )}

    </p>


    <p>

        <strong>Total Bab:</strong>

        ${totalChapters}

    </p>


    <p>

        <strong>Total Kata:</strong>

        ${totalWords}

    </p>

</div>


<!-- =========================================
     ISI BAB
========================================== -->

<div>

    ${chaptersHTML}

</div>

`;


                    /*
                    ========================================
                    STATUS BERHASIL
                    ========================================
                    */

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


                    /*
                    ========================================
                    STATUS ERROR
                    ========================================
                    */

                    if (output) {

                        output.innerHTML = `

<div class="domus-card">

    <h3>

        ❌ Publish Gagal

    </h3>


    <p>

        <strong>Status:</strong>

        Publish gagal.

    </p>


    <p>

        ${this.escapeHTML(
            error?.message ||
            String(error)
        )}

    </p>

</div>

`;

                    }


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
                ========================================
                UNLOCK BUTTON
                ========================================
                */

                button.disabled = false;

                button.textContent =
                    "🚀 Publish";

            }

        );

    }

}
