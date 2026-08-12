/*
====================================================
DOMUS Framework v1.0
Export Service
====================================================

Fungsi:

1. Mengambil manuscript dari PublishService
2. Menyiapkan data untuk PDF
3. Menyiapkan data untuk EPUB
4. Tidak mengubah naskah asli

Alur:

BookService
    ↓
ChapterService
    ↓
PublishService
    ↓
ExportService
    ↓
PDF / EPUB
====================================================
*/

import Service from "../core/Service.js";

import PublishService
    from "./PublishService.js";


class ExportService extends Service {


    /*
    ====================================================
    CONSTRUCTOR
    ====================================================
    */

    constructor() {

        super("ExportService");

    }


    /*
    ====================================================
    BUILD DOCUMENT
    ====================================================
    */

    async buildDocument() {

        const document =
            await PublishService.preview();


        if (!document) {

            throw new Error(
                "Manuscript belum tersedia."
            );

        }


        if (!document.book) {

            throw new Error(
                "Data buku tidak tersedia."
            );

        }


        if (
            !Array.isArray(
                document.chapters
            )
        ) {

            throw new Error(
                "Data bab tidak tersedia."
            );

        }


        return document;

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
    GENERATE HTML MANUSCRIPT
    ====================================================
    */

    async generateHTML() {

        const document =
            await this.buildDocument();


        const title =
            this.escapeHTML(
                document.book.title ||
                "Tanpa Judul"
            );


        const toc =
            Array.isArray(
                document.toc
            )
                ? document.toc
                : [];


        const chapters =
            document.chapters || [];


        let tocHTML = "";


        if (toc.length > 0) {

            tocHTML = toc
                .map(
                    item => `

<li>

${this.escapeHTML(
    item.title ||
    `Bab ${item.number}`
)}

</li>

`
                )
                .join("");

        }


        let chaptersHTML = "";


        chapters.forEach(
            (chapter, index) => {

                const number =
                    chapter.number ||
                    index + 1;


                const chapterTitle =
                    this.escapeHTML(

                        chapter.title ||
                        `Bab ${number}`

                    );


                const content =
                    this.escapeHTML(
                        chapter.content || ""
                    );


                const paragraphs =
                    content
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


                chaptersHTML += `

<article>

<h1>
Bab ${number}
</h1>

<h2>
${chapterTitle}
</h2>

${paragraphs}

</article>

`;

            }
        );


        return `

<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<title>
${title}
</title>

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
        60px 40px;

    color:
        #222;

    line-height:
        1.75;

}


.cover {

    min-height:
        700px;

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

}


.cover h1 {

    font-size:
        36px;

    line-height:
        1.3;

}


.toc {

    page-break-after:
        always;

}


article {

    page-break-before:
        always;

}


article h1 {

    font-size:
        28px;

}


article h2 {

    font-size:
        24px;

    margin-bottom:
        30px;

}


p {

    text-align:
        justify;

    margin-bottom:
        1.2em;

}


</style>

</head>


<body>


<section class="cover">

<div>
DOMUS ISAACI
</div>

<h1>
${title}
</h1>

<p>
DOMUS Framework v1.0
</p>

</section>


<section class="toc">

<h1>
Daftar Isi
</h1>

<ol>

${tocHTML}

</ol>

</section>


${chaptersHTML}


</body>

</html>

`;

    }


    /*
    ====================================================
    EXPORT PDF DATA
    ====================================================
    */

    async exportPDF() {

        const document =
            await this.buildDocument();


        const html =
            await this.generateHTML();


        return {

            success: true,

            format:
                "pdf",

            filename:
                `${document.book.title || "domus"}.html`,

            html,

            document

        };

    }


    /*
    ====================================================
    EXPORT EPUB DATA
    ====================================================
    */

    async exportEPUB() {

        const document =
            await this.buildDocument();


        const html =
            await this.generateHTML();


        return {

            success: true,

            format:
                "epub",

            filename:
                `${document.book.title || "domus"}.html`,

            html,

            document

        };

    }

}


export default new ExportService();
