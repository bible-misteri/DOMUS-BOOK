/*
====================================================
DOMUS Framework v1.1
Export Page
====================================================

Fungsi:

1. Membaca manuscript dari PublishService
2. Menampilkan informasi buku
3. Menampilkan daftar isi
4. Menampilkan naskah
5. Menyiapkan layout cetak A5
6. Menyembunyikan UI aplikasi saat print
7. Membuka dialog Print / Save as PDF

Export TIDAK mengubah manuscript.
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

                    return `

<div class="print-toc-item">

    <span>
        ${number}. ${title}
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

<section class="print-chapter">

<div class="print-chapter-heading">

    <div class="print-chapter-number">
        BAB ${number}
    </div>

    <h2>
        ${title}
    </h2>

</div>


<div class="print-chapter-content">

${
    paragraphs ||

    `<p><em>Bab ini belum memiliki isi.</em></p>`
}

</div>


<footer class="print-footer">

    <span>DOMUS ISAACI</span>

</footer>


<div class="print-page-number">

    ${number}

</div>


</section>

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
        --------------------------------------------
        TIDAK ADA DOKUMEN
        --------------------------------------------
        */

        if (!this.document) {

            return `

<section class="domus-export">

<h1>
📕 Export Buku
</h1>

<div class="domus-card">

<p>
⚠ Export belum dapat dibuat.
</p>

<p>
Pastikan buku aktif tersedia.
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
            this.document.totalChapters ||
            0;


        const totalWords =
            this.document.totalWords ||
            0;


        return `

<style>

/*
====================================================
DOMUS EXPORT SCREEN
====================================================
*/

.domus-export {

    max-width: 900px;

    margin: 0 auto;

    padding: 30px 20px 80px;

    font-family:
        Arial,
        sans-serif;

    color: #222;

}


/*
====================================================
EXPORT INFORMATION
====================================================
*/

.export-info {

    padding: 24px;

    border: 1px solid #ddd;

    border-radius: 10px;

    margin-top: 25px;

    background: #fff;

}


/*
====================================================
PRINT BOOK
====================================================
*/

.print-book {

    max-width: 700px;

    margin: 50px auto;

    background: white;

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    color: #222;

}


/*
====================================================
COVER
====================================================
*/

.print-cover {

    min-height: 900px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    padding: 70px 55px;

    box-sizing: border-box;

}


.print-brand {

    font-family: Arial, sans-serif;

    font-size: 13px;

    letter-spacing: 4px;

    margin-bottom: 80px;

}


.print-cover h1 {

    font-size: 32px;

    line-height: 1.35;

    font-weight: 600;

    margin: 0;

}


.print-cover-line {

    width: 80px;

    border-top: 2px solid #222;

    margin: 45px 0;

}


.print-cover-subtitle {

    font-size: 15px;

    color: #666;

}

.print-author {

    font-size: 13pt;

    letter-spacing: 1px;

    color: #444;

    margin-top: 5mm;

}


/*
====================================================
TITLE PAGE
====================================================
*/

/*
====================================================
TITLE PAGE — A5 PROFESSIONAL
====================================================
*/

.print-title-page {

    min-height: 900px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    padding: 60px;

    box-sizing: border-box;

    page-break-after: always;

}


.print-title-page h1 {

    max-width: 520px;

    font-size: 28px;

    line-height: 1.45;

    font-weight: 600;

    margin: 0 0 35px 0;

}


.print-title-page p {

    margin: 8px 0;

    font-size: 14px;

    color: #666;

}


.print-title-page .publisher {

    margin-top: 70px;

    font-size: 12px;

    letter-spacing: 2px;

    color: #888;

}


/*
====================================================
COPYRIGHT PAGE
====================================================
*/

.print-copyright {

    min-height: 700px;

    padding:
        80px 55px;

    box-sizing: border-box;

    display: flex;

    align-items: flex-end;

    page-break-after: always;

}


.copyright-content {

    max-width: 430px;

    font-size: 10pt;

    line-height: 1.7;

    color: #444;

}


.copyright-brand {

    font-family:
        Arial,
        sans-serif;

    font-size: 10pt;

    letter-spacing: 3px;

    margin-bottom: 35px;

}


.copyright-content h2 {

    font-size: 14pt;

    line-height: 1.5;

    margin-bottom: 30px;

}


.copyright-year {

    font-size: 10pt;

    margin-bottom: 25px;

}


.copyright-content p {

    margin-bottom: 18px;

}


.copyright-publisher {

    margin-top: 50px;

    font-family:
        Arial,
        sans-serif;

    font-size: 9pt;

    color: #777;

}

/*
====================================================
TABLE OF CONTENTS — A5
====================================================
*/

.print-toc {

    min-height: 700px;

    padding: 70px 55px;

    box-sizing: border-box;

    page-break-after: always;

}


.print-toc h2 {

    font-size: 25px;

    font-weight: 600;

    text-align: center;

    margin:

        0 0 45px 0;

}


.print-toc-item {

    display: flex;

    justify-content: space-between;

    align-items: baseline;

    padding: 11px 0;

    border-bottom:

        1px dotted #aaa;

    font-size: 14px;

}


.print-toc-item span {

    display: block;

}


/*
====================================================
CHAPTER
====================================================
*/

/*
====================================================
CHAPTER — A5 BOOK
====================================================
*/

.print-chapter {

    padding:

        35mm

        18mm

        20mm;

    box-sizing: border-box;

    page-break-before: always;

}


.print-chapter-heading {

    margin-bottom: 18mm;

    text-align: left;

}


.print-chapter-number {

    font-family:
        Arial,
        sans-serif;

    font-size: 9pt;

    letter-spacing: 3px;

    text-transform: uppercase;

    margin-bottom: 5mm;

    color: #777;

}


.print-chapter h2 {

    font-size: 20pt;

    line-height: 1.3;

    font-weight: 600;

    margin: 0;

}


.print-chapter-content {

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 11.5pt;

    line-height: 1.7;

    text-align: justify;

    text-justify: inter-word;

    flex: 1;

}


.print-chapter-content p {

    margin:
        0 0 1em 0;

    text-indent: 8mm;

    orphans: 3;

    widows: 3;

}


.print-chapter-content p:first-child {

    text-indent: 0;

}

/*
====================================================
BOOK FOOTER
====================================================
*/

.print-footer {

    margin-top: 20mm;

    padding-top: 4mm;

    font-family:
        Arial,
        sans-serif;

    font-size: 8pt;

    letter-spacing: 1.5px;

    text-align: center;

    color: #888;

    border-top:
        0.5px solid #ddd;

}

/*
====================================================
NOMOR HALAMAN
====================================================
*/

.print-page-number {

    display: none;

}

@media print {

    .print-page-number {

        display: block;

        position: fixed;

        bottom: 8mm;

        left: 0;

        right: 0;

        text-align: center;

        font-family:
            Arial,
            sans-serif;

        font-size: 8pt;

        color: #888;

    }

    .print-page-number::after {

        content:
            counter(page);

    }

}


/*
====================================================
END
====================================================
*/

.print-end {

    text-align: center;

    padding: 80px 40px;

    color: #777;

}


/*
====================================================
PRINT MODE
====================================================
*/

@media print {

    /*
    ====================================================
    HALAMAN A5
    ====================================================
    */

    @page {

    size: A5 portrait;

    margin:

        18mm

        18mm

        20mm

        18mm;

}

    .print-copyright {

        min-height: 0;

        height: 170mm;

        padding:
            20mm
            5mm;

        box-sizing: border-box;

        page-break-after: always;

        break-after: page;

}

    /*
    ====================================================
    SEMBUNYIKAN SELURUH UI DOMUS
    ====================================================
    */

    body * {

        visibility: hidden;

    }


    /*
    ====================================================
    HANYA BUKU YANG DICETAK
    ====================================================
    */

    .print-book,
    .print-book * {

        visibility: visible;

    }


    /*
    ====================================================
    RESET CONTAINER BUKU
    ====================================================
    */

    .print-book {

        position: absolute;

        left: 0;

        top: 0;

        width: 100%;

        max-width: none;

        margin: 0;

        padding: 0;

        border: none;

        background: white;

    }


    /*
    ====================================================
    COVER
    ====================================================
    */

    .print-cover {

        height: 170mm;

        min-height: 170mm;

        padding:
            20mm
            15mm;

        box-sizing: border-box;

        page-break-after: always;

        break-after: page;

        display: flex;

        flex-direction: column;

        justify-content: center;

        align-items: center;

        text-align: center;

    }


    /*
    ====================================================
    JUDUL / TITLE PAGE
    ====================================================
    */

    .print-title-page {

        height: 170mm;

        min-height: 170mm;

        padding:
            20mm
            15mm;

        box-sizing: border-box;

        page-break-after: always;

        break-after: page;

        display: flex;

        flex-direction: column;

        justify-content: center;

        align-items: center;

        text-align: center;

    }

    .title-page-spacer {
        height: 20mm;
    }

    .title-page-line {

        width: 45mm;

        border-top:
            1px solid #222;

        margin:
            12mm 0;

    }

    .title-page-brand {

        font-family:
            Arial,
            sans-serif;

        font-size: 11pt;

        letter-spacing: 3px;

        color: #444;

    }

    .title-page-publisher {

        margin-top: 25mm;

        font-family:
            Arial,
            sans-serif;

        font-size: 9pt;

        letter-spacing: 1px;

        color: #888;

    }


    /*
    ====================================================
    DAFTAR ISI
    ====================================================
    */

    .print-toc {

        min-height: 0;

        height: auto;

        padding:
            15mm
            5mm;

        box-sizing: border-box;

        page-break-after: always;

        break-after: page;

    }


    /*
    ====================================================
    BAB
    ====================================================
    */

.print-chapter {

    page-break-before: always;
    break-before: page;

    padding: 10mm 0;

}

.print-chapter-heading {

    page-break-after: avoid;
    break-after: avoid;

}


    /*
    ====================================================
    JUDUL BAB
    ====================================================
    */

    .print-chapter-heading {

        margin-bottom: 18mm;

        text-align: left;

        break-after: avoid;

        page-break-after: avoid;

    }


    .print-chapter-number {

        font-size: 10pt;

        letter-spacing: 2px;

        margin-bottom: 4mm;

    }


    .print-chapter h2 {

        font-size: 20pt;

        line-height: 1.3;

        margin: 0;

        page-break-after: avoid;

        break-after: avoid;

    }

    .print-page-number {

        margin-top: 8mm;

        font-family:
            Arial,
            sans-serif;

        font-size: 8pt;

        color: #888;

        text-align: center;

    }


    /*
    ====================================================
    ISI BAB
    ====================================================
    */

    .print-chapter-content {

        font-size: 11.5pt;

        line-height: 1.7;

        text-align: justify;

    }


    .print-chapter-content p {

        margin:
            0
            0
            1.2em
            0;

        orphans: 3;

        widows: 3;

    }


    /*
    ====================================================
    AKHIR BUKU
    ====================================================
    */

    .print-end {

        text-align: center;

        padding: 30mm 10mm;

        color: #777;

        page-break-before: always;

        break-before: page;

    }


    /*
    ====================================================
    JANGAN CETAK TOMBOL
    ====================================================
    */

    #btnPrintBook {

        display: none !important;

    }

}


/*
====================================================
SCREEN ONLY
====================================================
*/

@media screen {

    .print-book {

        border:

            1px solid #ddd;

        padding: 20px;

    }

}

</style>


<section class="domus-export">


<h1>
📕 Export Buku
</h1>


<p
style="
color:#666;
">

DOMUS Publisher v1.1

</p>


<!-- ================================================
     INFORMASI BUKU
================================================ -->

<div class="export-info">


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
     ACTION
================================================ -->

<div
style="
margin:30px 0;
">

<button
id="btnPrintBook"
type="button">

🖨️ Cetak / Simpan PDF

</button>

</div>


<!-- ================================================
     PRINT BOOK
================================================ -->

<div class="print-book">

<div class="print-page-number"></div>

<!-- COVER -->

<section class="print-cover">

<div class="print-brand">

DOMUS ISAACI

</div>

<h1>

${title}

</h1>

<div class="print-cover-line"></div>

<p class="print-author">
    Norman Sandhi
</p>

</section>

<!-- TITLE PAGE -->

<section class="print-title-page">

    <div class="title-page-spacer"></div>

    <h1>
        ${title}
    </h1>

    <div class="title-page-line"></div>

    <p class="title-page-brand">
        DOMUS ISAACI
    </p>

    <p class="title-page-publisher">
        DOMUS Framework v1.1
    </p>

</section>

<!-- COPYRIGHT PAGE -->

<section class="print-copyright">

    <div class="copyright-content">

        <p class="copyright-brand">
            DOMUS ISAACI
        </p>

        <h2>
            Membaca Kembali Kisah Yakub dan Esau
            dalam Terang Kristus
        </h2>

        <p class="copyright-year">
            © 2026 Norman Sandhi
        </p>

        <p>
            Hak cipta dilindungi.
        </p>

        <p>
            Tidak ada bagian dari buku ini yang boleh
            diperbanyak, disimpan, atau disebarluaskan
            dalam bentuk apa pun tanpa izin dari penulis,
            kecuali untuk kepentingan kutipan dan kajian
            yang sesuai dengan ketentuan yang berlaku.
        </p>

        <p class="copyright-publisher">
            DOMUS ISAACI<br>
            DOMUS Framework
        </p>

    </div>

</section>


<!-- TABLE OF CONTENTS -->

<section class="print-toc">

<h2>
Daftar Isi
</h2>


${this.renderTOC()}


</section>


<!-- MANUSCRIPT -->

${this.renderChapters()}


<!-- END -->

<section class="print-end">

DOMUS Framework v1.1

</section>


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
                "#btnPrintBook"
            );


        if (!button) {

            return;

        }


        button.onclick = () => {

            window.print();

        };


        console.log(
            "DOMUS Export v1.1 rendered.",
            this.document
        );

    }

}
