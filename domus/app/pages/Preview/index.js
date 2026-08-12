/*
====================================================
DOMUS Framework v1.0
Preview Page
====================================================

Menampilkan preview buku berdasarkan
manuscript yang dibangun oleh PublishService.

Alur:

BookService
    ↓
ChapterService
    ↓
PublishService
    ↓
PreviewPage
====================================================
*/

import Page from "../../core/Page.js";

import PublishService
    from "../../services/PublishService.js";


export default class PreviewPage extends Page {


    /*
    ====================================================
    CONSTRUCTOR
    ====================================================
    */

    constructor() {

        super();

        this.document = null;

    }


    /*
    ====================================================
    LOAD
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
                (item) => {

                    const number =
                        item.number || "";

                    const title =
                        this.escapeHTML(
                            item.title ||
                            `Bab ${number}`
                        );

                    const wordCount =
                        item.wordCount || 0;


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
    RENDER BAB
    ====================================================
    */

    renderChapters() {

        if (
            !this.document ||
            !Array.isArray(
                this.document.chapters
            )
        ) {

            return "";

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


                    /*
                    ----------------------------------------
                    ESCAPE CONTENT
                    ----------------------------------------
                    */

                    const safeContent =
                        this.escapeHTML(
                            content
                        );


                    /*
                    ----------------------------------------
                    PARAGRAF
                    ----------------------------------------

                    Setiap blok kosong menjadi
                    pemisah paragraf.
                    ----------------------------------------
                    */

                    const paragraphs =
                        safeContent
                            .split(/\n\s*\n/)
                            .map(
                                paragraph => {

                                    const clean =
                                        paragraph
                                            .trim();

                                    if (!clean) {

                                        return "";

                                    }

                                    return `

<p
style="
margin:0 0 1.2em 0;
line-height:1.75;
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


                    return `

<article
class="domus-preview-chapter"
style="
margin-top:60px;
padding-top:40px;
border-top:2px solid #222;
">


<h2
style="
margin:0 0 8px 0;
font-size:28px;
">

BAB ${number}

</h2>


<h3
style="
margin:0 0 30px 0;
font-size:24px;
font-weight:600;
">

${title}

</h3>


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
font-size:14px;
color:#777;
">

${chapter.wordCount || 0} kata

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
        TIDAK ADA DOKUMEN
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


        const totalChapters =
            this.document.totalChapters ||
            0;


        const totalWords =
            this.document.totalWords ||
            0;


        /*
        ================================================
        TANGGAL
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
                    this.document.generatedAt;

            }

        }


        return `

<section
class="domus-preview"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 80px 20px;
font-family:Georgia, 'Times New Roman', serif;
color:#222;
">


<!-- ================================================
     HEADER PREVIEW
================================================ -->

<div
style="
margin-bottom:30px;
font-family:Arial, sans-serif;
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
     COVER / JUDUL
================================================ -->

<section
class="domus-preview-cover"
style="
min-height:420px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
padding:50px 30px;
border:1px solid #ddd;
margin-bottom:60px;
">

<div
style="
font-family:Arial, sans-serif;
font-size:14px;
letter-spacing:3px;
margin-bottom:35px;
">

DOMUS ISAACI

</div>


<h1
style="
font-size:38px;
line-height:1.25;
margin:0;
">

${title}

</h1>


<div
style="
margin-top:40px;
width:80px;
border-top:2px solid #222;
">

</div>


<p
style="
margin-top:30px;
color:#666;
">

Preview Naskah

</p>


</section>


<!-- ================================================
     INFORMASI DOKUMEN
================================================ -->

<section
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-bottom:50px;
font-family:Arial, sans-serif;
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
margin-bottom:50px;
">

<h2
style="
font-size:28px;
border-bottom:2px solid #222;
padding-bottom:12px;
">

Daftar Isi

</h2>


${this.renderTOC()}


</section>


<!-- ================================================
     NASKAH
================================================ -->

<section
class="domus-preview-manuscript"
>

<h2
style="
font-size:30px;
border-bottom:2px solid #222;
padding-bottom:12px;
">

Naskah

</h2>


${this.renderChapters()}


</section>


<!-- ================================================
     AKHIR DOKUMEN
================================================ -->

<div
style="
margin-top:80px;
padding-top:30px;
border-top:1px solid #ddd;
text-align:center;
color:#777;
font-family:Arial, sans-serif;
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
        Preview bersifat read-only.
        Tidak ada autosave.
        --------------------------------------------
        */

        console.log(
            "DOMUS Preview rendered.",
            this.document
        );

    }

}
