/*
====================================================
DOMUS Framework v1.0
Preview Page
====================================================

PREVIEW BOOK v1.1

Struktur:

COVER
↓
TITLE PAGE
↓
COPYRIGHT
↓
DEDICATION
↓
INTRODUCTION
↓
TOC
↓
MAIN MATTER
↓
BACK MATTER

Preview bersifat READ-ONLY.

Tidak mengubah:
- Book
- Chapter
- Manuscript
- Store
====================================================
*/

import Page from "../../core/Page.js";

import PublishService
    from "../../services/PublishService.js";


export default class PreviewPage extends Page {

    constructor() {

        super();

        this.document = null;

    }


    /*
    ====================================================
    LOAD MANUSCRIPT
    ====================================================
    */

    async load() {

        this.document = null;

        try {

            this.document =
                await PublishService.preview();

        }

        catch (error) {

            console.error(
                "DOMUS Preview Error:",
                error
            );

            this.document = null;

        }

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
    FORMAT PARAGRAPH
    ====================================================
    */

    renderText(text = "") {

        const safeText =
            this.escapeHTML(text);

        const paragraphs =
            safeText
                .split(/\n\s*\n/)
                .map(
                    paragraph => {

                        const clean =
                            paragraph.trim();

                        if (!clean) {

                            return "";

                        }

                        return `

<p
style="
margin:0 0 1.2em 0;
line-height:1.8;
text-align:justify;
">

${clean.replace(
    /\n/g,
    "<br>"
)}

</p>

`;

                    }
                )
                .join("");

        return paragraphs;

    }


    /*
    ====================================================
    RENDER SIMPLE PAGE
    ====================================================
    */

    renderBookPage(
        title,
        content = "",
        extraClass = ""
    ) {

        const safeTitle =
            this.escapeHTML(
                title || ""
            );

        const body =
            this.renderText(
                content || ""
            );

        return `

<section
class="
domus-preview-page
${extraClass}
"
style="
min-height:420px;
padding:70px 50px;
margin-bottom:60px;
border:1px solid #ddd;
box-sizing:border-box;
">

<h2
style="
font-size:28px;
margin:0 0 35px 0;
border-bottom:2px solid #222;
padding-bottom:12px;
">

${safeTitle}

</h2>

<div
style="
font-size:18px;
">

${
    body ||

    `

<p
style="
color:#777;
font-style:italic;
">

Belum ada isi.

</p>

`

}

</div>

</section>

`;

    }


    /*
    ====================================================
    RENDER TOC
    ====================================================
    */

    renderTOC() {

        if (
            !this.document ||
            !Array.isArray(
                this.document.toc
            )
        ) {

            return `

<p>
Daftar Isi belum tersedia.
</p>

`;

        }


        if (
            this.document.toc.length === 0
        ) {

            return `

<p>
Belum ada bab.
</p>

`;

        }


        return this.document.toc
            .map(
                (item, index) => {

                    const number =
                        item.number ||
                        index + 1;

                    const title =
                        this.escapeHTML(
                            item.title ||
                            `Bab ${number}`
                        );

                    const wordCount =
                        Number(
                            item.wordCount || 0
                        );

                    return `

<div
class="domus-preview-toc-item"
style="
display:flex;
justify-content:space-between;
gap:16px;
padding:10px 0;
border-bottom:1px solid #e5e5e5;
">

<span>

<strong>
${number}.
</strong>

${title}

</span>

<span
style="
white-space:nowrap;
color:#666;
">

${wordCount} kata

</span>

</div>

`;

                }
            )
            .join("");

    }


    /*
    ====================================================
    RENDER CHAPTERS
    ====================================================
    */

    renderChapters() {

        if (
            !this.document ||
            !Array.isArray(
                this.document.chapters
            )
        ) {

            return `

<p>
Belum ada bab.
</p>

`;

        }


        if (
            this.document.chapters.length === 0
        ) {

            return `

<p>
Belum ada bab.
</p>

`;

        }


        return this.document.chapters
            .map(
                (chapter, index) => {

                    const number =
                        chapter.number ||
                        index + 1;

                    const title =
                        this.escapeHTML(
                            chapter.title ||
                            `Bab ${number}`
                        );

                    const content =
                        String(
                            chapter.content || ""
                        );

                    const paragraphs =
                        this.renderText(
                            content
                        );

                    const wordCount =
                        Number(
                            chapter.wordCount || 0
                        );

                    return `

<article
class="domus-preview-chapter"
style="
margin-top:70px;
padding-top:45px;
border-top:2px solid #222;
">


<div
style="
font-family:Arial,sans-serif;
font-size:14px;
letter-spacing:2px;
color:#666;
margin-bottom:15px;
">

BAB ${number}

</div>


<h2
style="
margin:0 0 30px 0;
font-size:30px;
line-height:1.3;
">

${title}

</h2>


<div
class="domus-preview-content"
style="
font-size:18px;
">

${
    paragraphs ||

    `

<p
style="
color:#777;
font-style:italic;
">

Bab ini belum memiliki isi.

</p>

`

}

</div>


<div
style="
margin-top:25px;
font-family:Arial,sans-serif;
font-size:13px;
color:#777;
">

${wordCount} kata

</div>


</article>

`;

                }
            )
            .join("");

    }


    /*
    ====================================================
    RENDER CONTENT
    ====================================================
    */

    renderContent() {

        /*
        ================================================
        TIDAK ADA MANUSCRIPT
        ================================================
        */

        if (!this.document) {

            return `

<section
class="domus-preview"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px;
">

<h1>
Preview Buku
</h1>

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
">

<p>
❌ Preview belum dapat dibuat.
</p>

<p>
Pastikan buku aktif dan naskah
memiliki minimal satu bab.
</p>

</div>

</section>

`;

        }


        /*
        ================================================
        DATA BUKU
        ================================================
        */

        const book =
            this.document.book || {};


        const title =
            this.escapeHTML(
                book.title ||
                "Tanpa Judul"
            );


        const author =
            this.escapeHTML(
                book.author ||
                "DOMUS"
            );


        const copyright =
            this.escapeHTML(
                book.copyright ||
                ""
            );


        const dedication =
            book.dedication ||
            "";


        const introduction =
            book.introduction ||
            "";


        const totalChapters =
            Number(
                this.document.totalChapters || 0
            );


        const totalWords =
            Number(
                this.document.totalWords || 0
            );


        /*
        ================================================
        GENERATED DATE
        ================================================
        */

        let generatedAt = "";

        if (
            this.document.generatedAt
        ) {

            try {

                generatedAt =
                    new Date(
                        this.document.generatedAt
                    ).toLocaleString(
                        "id-ID"
                    );

            }

            catch (error) {

                generatedAt =
                    String(
                        this.document.generatedAt
                    );

            }

        }


        /*
        ================================================
        RETURN BOOK
        ================================================
        */

        return `

<section
class="domus-preview"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 100px 20px;
font-family:Georgia,'Times New Roman',serif;
color:#222;
">


<!-- ================================================
     PREVIEW HEADER
================================================ -->

<div
style="
margin-bottom:35px;
font-family:Arial,sans-serif;
">

<h1
style="
margin-bottom:5px;
">

Preview Buku

</h1>

<p
style="
color:#666;
margin-top:0;
">

DOMUS Publisher v1.0

</p>

</div>


<!-- ================================================
     COVER
================================================ -->

<section
class="domus-preview-cover"
style="
min-height:520px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
padding:60px 40px;
border:1px solid #ddd;
margin-bottom:60px;
box-sizing:border-box;
">

<div
style="
font-family:Arial,sans-serif;
font-size:14px;
letter-spacing:4px;
margin-bottom:45px;
">

DOMUS ISAACI

</div>


<h1
style="
font-size:40px;
line-height:1.25;
margin:0;
">

${title}

</h1>


<div
style="
margin-top:45px;
width:80px;
border-top:2px solid #222;
">

</div>


<p
style="
margin-top:30px;
color:#666;
">

${author}

</p>


</section>


<!-- ================================================
     TITLE PAGE
================================================ -->

${this.renderBookPage(
    "Halaman Judul",
    `${book.title || "Tanpa Judul"}\n\n${book.author || "DOMUS"}`,
    "domus-title-page"
)}


<!-- ================================================
     COPYRIGHT
================================================ -->

${this.renderBookPage(
    "Copyright",
    copyright,
    "domus-copyright-page"
)}


<!-- ================================================
     DEDICATION
================================================ -->

${this.renderBookPage(
    "Dedikasi",
    dedication,
    "domus-dedication-page"
)}


<!-- ================================================
     PENDAHULUAN
================================================ -->

${this.renderBookPage(
    "Pendahuluan",
    introduction,
    "domus-introduction-page"
)}


<!-- ================================================
     INFORMASI MANUSCRIPT
================================================ -->

<section
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-bottom:60px;
font-family:Arial,sans-serif;
">

<h2>
Informasi Naskah
</h2>

<p>

<strong>
Total Bab:
</strong>

${totalChapters}

</p>

<p>

<strong>
Total Kata:
</strong>

${totalWords}

</p>

${
    generatedAt

        ? `

<p>

<strong>
Dibangun:
</strong>

${generatedAt}

</p>

`

        : ""

}

</section>


<!-- ================================================
     DAFTAR ISI
================================================ -->

<section
class="domus-preview-toc"
style="
margin-bottom:70px;
">

<h2
style="
font-size:30px;
border-bottom:2px solid #222;
padding-bottom:12px;
">

Daftar Isi

</h2>


${this.renderTOC()}


</section>


<!-- ================================================
     MAIN MATTER
================================================ -->

<section
class="domus-preview-manuscript"
>

<div
style="
font-family:Arial,sans-serif;
font-size:13px;
letter-spacing:3px;
color:#666;
margin-bottom:10px;
">

MAIN MATTER

</div>


<h2
style="
font-size:32px;
border-bottom:2px solid #222;
padding-bottom:12px;
">

Naskah

</h2>


${this.renderChapters()}


</section>


<!-- ================================================
     BACK MATTER
================================================ -->

<section
class="domus-preview-backmatter"
style="
margin-top:90px;
padding-top:45px;
border-top:2px solid #222;
">

<div
style="
font-family:Arial,sans-serif;
font-size:13px;
letter-spacing:3px;
color:#666;
margin-bottom:10px;
">

BACK MATTER

</div>


<h2
style="
font-size:30px;
">

Catatan

</h2>


<p
style="
line-height:1.8;
">

Bagian catatan, daftar pustaka,
dan informasi penulis akan ditempatkan
di sini pada tahap berikutnya.

</p>


<h2
style="
font-size:30px;
margin-top:50px;
">

Daftar Pustaka

</h2>


<p
style="
line-height:1.8;
color:#777;
">

Belum ada daftar pustaka.

</p>


<h2
style="
font-size:30px;
margin-top:50px;
">

Tentang Penulis

</h2>


<p
style="
line-height:1.8;
color:#777;
">

Belum ada informasi penulis.

</p>


</section>


<!-- ================================================
     FOOTER
================================================ -->

<div
style="
margin-top:100px;
padding-top:30px;
border-top:1px solid #ddd;
text-align:center;
color:#777;
font-family:Arial,sans-serif;
">

DOMUS Framework v1.0

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

        /*
        --------------------------------------------
        PREVIEW READ-ONLY
        --------------------------------------------
        */

        console.log(
            "DOMUS Preview rendered.",
            this.document
        );

    }

}
