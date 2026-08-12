/*
====================================================
DOMUS Framework v1.0
Export Page
====================================================

Membangun dokumen export berdasarkan
manuscript dari PublishService.

Alur:

BookService
    ↓
ChapterService
    ↓
PublishService
    ↓
ExportPage
====================================================
*/

import Page from "../../core/Page.js";

import PublishService
    from "../../services/PublishService.js";


export default class ExportPage extends Page {


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
                "DOMUS Export Error:",
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

            return "";

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


                    return `

<li>

<strong>
${number}.
</strong>

${title}

</li>

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


                    const safeContent =
                        this.escapeHTML(
                            content
                        );


                    const paragraphs =
                        safeContent
                            .split(/\n\s*\n/)
                            .map(
                                paragraph => {

                                    const clean =
                                        paragraph.trim();

                                    if (!clean) {

                                        return "";

                                    }

                                    return `

<p>

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
style="
margin-top:50px;
padding-top:30px;
border-top:2px solid #222;
">

<h2>

BAB ${number}

</h2>

<h3>

${title}

</h3>

<div>

${
    paragraphs ||

    "<p><em>Bab ini belum memiliki isi.</em></p>"
}

</div>

</article>

`;

                }

            )
            .join("");

    }


    /*
    ====================================================
    BUILD EXPORT HTML
    ====================================================
    */

    buildExportHTML() {

        if (!this.document) {

            return "";

        }


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


        const toc =
            this.renderTOC();


        const chapters =
            this.renderChapters();


        return `

<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<style>

body {

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    max-width:
        800px;

    margin:
        0 auto;

    padding:
        60px 30px;

    color:
        #222;

    line-height:
        1.75;

}

.cover {

    min-height:
        500px;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    align-items:
        center;

    text-align:
        center;

    page-break-after:
        always;

}

.cover h1 {

    font-size:
        38px;

    line-height:
        1.3;

}

.meta {

    color:
        #666;

    font-family:
        Arial,
        sans-serif;

}

.toc {

    page-break-after:
        always;

}

.toc li {

    margin-bottom:
        10px;

}

article {

    page-break-before:
        always;

}

h2 {

    font-size:
        28px;

}

h3 {

    font-size:
        24px;

}

p {

    text-align:
        justify;

    margin-bottom:
        1.2em;

}

.footer {

    margin-top:
        80px;

    padding-top:
        20px;

    border-top:
        1px solid #ddd;

    text-align:
        center;

    color:
        #777;

}

</style>

</head>


<body>


<section class="cover">

<div
class="meta">

DOMUS ISAACI

</div>


<h1>

${title}

</h1>


<p>

DOMUS Publisher v1.0

</p>


<p
class="meta">

${totalChapters} Bab
·
${totalWords} Kata

</p>

</section>


<section class="toc">

<h2>

Daftar Isi

</h2>


<ol>

${toc}

</ol>

</section>


<section>

${chapters}

</section>


<div class="footer">

DOMUS Framework v1.0

</div>


</body>

</html>

`;

    }


    /*
    ====================================================
    RENDER CONTENT
    ====================================================
    */

    renderContent() {

        if (!this.document) {

            return `

<section
class="domus-export"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px;
">

<h1>

Export Buku

</h1>


<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
">

<p>

❌ Dokumen export belum tersedia.

</p>

<p>

Pastikan buku aktif dan naskah
dapat dibangun.

</p>

</div>

</section>

`;

        }


        const book =
            this.document.book || {};


        const title =
            this.escapeHTML(
                book.title ||
                "Tanpa Judul"
            );


        return `

<section
class="domus-export"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 80px 20px;
">


<h1>

📕 Export Buku

</h1>


<p
style="
color:#666;
">

DOMUS Publisher v1.0 —
menyiapkan naskah untuk
format digital.

</p>


<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">


<h2>

Informasi Buku

</h2>


<p>

<strong>
Judul:
</strong>

${title}

</p>


<p>

<strong>
Total Bab:
</strong>

${this.document.totalChapters}

</p>


<p>

<strong>
Total Kata:
</strong>

${this.document.totalWords}

</p>


</div>


<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">


<h2>

📑 Daftar Isi

</h2>


<ol>

${this.renderTOC()}

</ol>


</div>


<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">


<h2>

📦 Format Export

</h2>


<p>

Naskah sudah berhasil dibangun
sebagai manuscript terstruktur.

</p>


<button
id="btnExportHTML"
class="domus-btn domus-btn-primary"
type="button">

📄 Export HTML

</button>


<p
style="
margin-top:15px;
color:#666;
">

PDF dan EPUB akan dibuat pada
tahap berikutnya setelah
Export HTML berhasil.

</p>


</div>


<div
id="export-status"
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">

<strong>
Status:
</strong>

✓ Naskah siap diekspor.

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
                "#btnExportHTML"
            );


        if (!button) {

            return;

        }


        button.onclick = () => {

            try {

                const html =
                    this.buildExportHTML();


                if (!html) {

                    throw new Error(
                        "Dokumen export belum tersedia."
                    );

                }


                const blob =
                    new Blob(
                        [html],
                        {
                            type:
                                "text/html;charset=utf-8"
                        }
                    );


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    "domus-book.html";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                URL.revokeObjectURL(
                    url
                );


                const status =
                    this.element.querySelector(
                        "#export-status"
                    );


                if (status) {

                    status.innerHTML = `

<strong>
Status:
</strong>

✓ Export HTML berhasil.

`;

                }

            }

            catch (error) {

                console.error(
                    "DOMUS HTML Export Error:",
                    error
                );


                const status =
                    this.element.querySelector(
                        "#export-status"
                    );


                if (status) {

                    status.innerHTML = `

<strong>
Status:
</strong>

❌ Export gagal.

<br><br>

${this.escapeHTML(
    error.message || String(error)
)}

`;

                }

            }

        };


        console.log(
            "DOMUS Export rendered.",
            this.document
        );

    }

}
