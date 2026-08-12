/*
====================================================
DOMUS Framework v1.0
Export Page
====================================================

Fungsi:

1. Mengambil manuscript dari PublishService
2. Menampilkan informasi buku
3. Menampilkan Daftar Isi
4. Menampilkan isi seluruh bab
5. Menyiapkan dokumen untuk export

Export tidak mengubah naskah.
====================================================
*/

import Page from "../../core/Page.js";

import PublishService
    from "../../services/PublishService.js";


export default class ExportPage extends Page {


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
class="domus-export"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 80px;
">

<h1>
📕 Export Buku
</h1>

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
">

<p>
❌ Manuscript belum tersedia.
</p>

<p>
Pastikan buku aktif dan naskah
dapat dibuka melalui Preview.
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


        const totalChapters =
            this.document.totalChapters || 0;


        const totalWords =
            this.document.totalWords || 0;


        /*
        ================================================
        TOC
        ================================================
        */

        let tocHTML = "";


        if (
            Array.isArray(
                this.document.toc
            )
        ) {

            tocHTML =
                this.document.toc
                    .map(
                        item => {

                            return `

<div
style="
padding:8px 0;
border-bottom:1px solid #eee;
">

<strong>
${item.number}.
</strong>

${this.escapeHTML(
    item.title ||
    `Bab ${item.number}`
)}

<span
style="
color:#777;
">

 — ${item.wordCount || 0} kata

</span>

</div>

`;

                        }

                    )
                    .join("");

        }


        /*
        ================================================
        BAB
        ================================================
        */

        let chaptersHTML = "";


        if (
            Array.isArray(
                this.document.chapters
            )
        ) {

            chaptersHTML =
                this.document.chapters
                    .map(
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
                                    .split(
                                        /\n\s*\n/
                                    )
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
line-height:1.75;
text-align:justify;
margin-bottom:1.2em;
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
class="domus-export-chapter"
style="
margin-top:60px;
padding-top:40px;
border-top:2px solid #222;
">

<h2>

BAB ${number}

</h2>

<h3>

${chapterTitle}

</h3>

<div>

${
    paragraphs ||

    `<p
    style="
    color:#777;
    font-style:italic;
    ">
    
    Bab ini belum memiliki isi.
    
    </p>`
}

</div>

<p
style="
color:#777;
font-size:14px;
">

${chapter.wordCount || 0} kata

</p>

</article>

`;

                        }

                    )
                    .join("");

        }


        /*
        ================================================
        RENDER HALAMAN
        ================================================
        */

        return `

<section
class="domus-export"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 80px;
font-family:Georgia, 'Times New Roman', serif;
color:#222;
">


<h1
style="
font-family:Arial,sans-serif;
">

📕 Export Buku

</h1>


<p
style="
font-family:Arial,sans-serif;
color:#666;
">

DOMUS Publisher v1.0

</p>


<!-- ================================================
     INFORMASI
================================================ -->

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
font-family:Arial,sans-serif;
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

${totalChapters}

</p>

<p>

<strong>
Total Kata:
</strong>

${totalWords}

</p>

</div>


<!-- ================================================
     TOC
================================================ -->

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
font-family:Arial,sans-serif;
">

<h2>
📑 Daftar Isi
</h2>

${tocHTML}

</div>


<!-- ================================================
     EXPORT ACTION
================================================ -->

<div
style="
margin-top:25px;
font-family:Arial,sans-serif;
">

<button
id="btnExportPrint"
class="domus-btn domus-btn-primary"
type="button">

🖨️ Cetak / Simpan PDF

</button>

</div>


<!-- ================================================
     MANUSCRIPT
================================================ -->

<section
id="exportDocument"
style="
margin-top:50px;
">

<h2
style="
font-size:30px;
border-bottom:2px solid #222;
padding-bottom:12px;
">

Naskah Buku

</h2>


${chaptersHTML}


</section>


<!-- ================================================
     FOOTER
================================================ -->

<div
style="
margin-top:80px;
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

        const button =
            this.element.querySelector(
                "#btnExportPrint"
            );


        if (!button) {

            return;

        }


        button.onclick = () => {

            window.print();

        };

    }

}
