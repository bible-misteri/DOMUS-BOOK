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
ROMAN NUMERAL
====================================================
*/

toRoman(number) {

    const values = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"]
    ];

    let result = "";

    let value = Number(number);

    for (const [arabic, roman] of values) {

        while (value >= arabic) {

            result += roman;

            value -= arabic;

        }

    }

    return result.toLowerCase();

}

/*
====================================================
PAGE NUMBER
====================================================
*/

formatPageNumber(number, section) {

    /*
    --------------------------------------------
    FRONT MATTER
    --------------------------------------------
    */

    if (section === "front") {

        return this.toRoman(number);

    }


    /*
    --------------------------------------------
    MAIN MATTER
    --------------------------------------------
    */

    return String(number);

}

/*
====================================================
PAGE LABEL
====================================================
*/

getPageLabel(pageNumber, section = "main", showNumber = true) {

    if (!showNumber) {

        return "";

    }

    if (section === "front") {

        return this.toRoman(pageNumber);

    }

    return String(pageNumber);

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

STRUKTUR HALAMAN:

FRONT MATTER
    Cover          → tanpa nomor
    Title Page     → tanpa nomor
    Copyright      → tanpa nomor
    Daftar Isi     → i

MAIN MATTER
    BAB 1          → 1
    BAB 2          → 2
    BAB 3          → 3
    dst.

Setiap bagian dibungkus dalam .domus-page.

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


    /*
    --------------------------------------------
    DATA BUKU
    --------------------------------------------
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
    --------------------------------------------
    EXPORT SCREEN
    --------------------------------------------
    */

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

    width: 148mm;

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
DOMUS A5 PAGE
====================================================
*/

.domus-page {

    width: 148mm;

    height: 210mm;

    min-height: 210mm;

    box-sizing: border-box;

    position: relative;

    background: #fff;

    margin: 0 auto;

    page-break-after: always;

    break-after: page;

}


.domus-page-content {

    width: 100%;

    min-height: 100%;

    box-sizing: border-box;

}


/*
====================================================
PAGE NUMBER
====================================================
*/

.print-page-number {

    position: absolute;

    left: 0;

    right: 0;

    bottom: 5mm;

    text-align: center;

    font-family:
        Arial,
        sans-serif;

    font-size: 8pt;

    color: #888;

    line-height: 1;

}


/*
====================================================
COVER
====================================================
*/

.print-cover {

    height: 210mm;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    padding: 20mm 15mm;

    box-sizing: border-box;

}


.print-brand {

    font-family:
        Arial,
        sans-serif;

    font-size: 13px;

    letter-spacing: 4px;

    margin-bottom: 30mm;

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

    margin: 15mm 0;

}


.print-cover-subtitle {

    font-size: 15px;

    color: #666;

}


/*
====================================================
TITLE PAGE
====================================================
*/

.print-title-page {

    height: 210mm;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    padding: 20mm;

    box-sizing: border-box;

}


.print-title-page h1 {

    font-size: 30px;

    line-height: 1.4;

}


.print-title-page p {

    color: #666;

}


/*
====================================================
COPYRIGHT
====================================================
*/

.print-copyright {

    height: 210mm;

    padding:
        20mm
        5mm;

    box-sizing: border-box;

    display: flex;

    flex-direction: column;

    justify-content: center;

}


/*
====================================================
TABLE OF CONTENTS
====================================================
*/

.print-toc {

    height: 210mm;

    padding:
        20mm
        15mm;

    box-sizing: border-box;

}


.print-toc h2 {

    font-size: 26px;

    margin-bottom: 15mm;

}


.print-toc-item {

    display: flex;

    justify-content: space-between;

    padding: 4mm 0;

    border-bottom:
        1px dotted #bbb;

    font-size: 15px;

}


/*
====================================================
CHAPTER
====================================================
*/

.print-chapter {

    min-height: 190mm;

    padding:
        15mm
        15mm
        18mm;

    box-sizing: border-box;

}


.print-chapter-heading {

    margin-bottom: 12mm;

}


.print-chapter-number {

    font-family:
        Arial,
        sans-serif;

    font-size: 10pt;

    letter-spacing: 2px;

    margin-bottom: 4mm;

}


.print-chapter h2 {

    font-size: 20pt;

    line-height: 1.35;

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

}


.print-chapter-content p {

    margin:
        0 0 1.25em 0;

}


/*
====================================================
BOOK FOOTER
====================================================
*/

.print-footer {

    margin-top: 20mm;

    padding-top: 4mm;

    font-size: 8pt;

    color: #888;

    border-top:
        0.5px solid #ddd;

    text-align: center;

}


/*
====================================================
END
====================================================
*/

.print-end {

    height: 210mm;

    display: flex;

    align-items: center;

    justify-content: center;

    text-align: center;

    color: #777;

}


/*
====================================================
PRINT MODE
====================================================
*/

@media print {


    @page {

        size: A5;

        margin: 0;

    }


    body * {

        visibility: hidden;

    }


    .print-book,
    .print-book * {

        visibility: visible;

    }


    .domus-export {

        display: none;

    }


    .print-book {

        width: 148mm;

        margin: 0;

    }


    .domus-page {

        width: 148mm;

        height: 210mm;

        min-height: 210mm;

        margin: 0;

        padding: 0;

        page-break-after: always;

        break-after: page;

    }


    .print-page-number {

        position: absolute;

        bottom: 5mm;

    }

}


/*
====================================================
SCREEN
====================================================
*/

@media screen {

    .print-book {

        border:
            1px solid #ddd;

        padding: 10px;

    }

}

</style>


<section class="domus-export">


<h1>
    📕 Export Buku
</h1>


<p style="color:#666;">

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

<div style="margin:30px 0;">

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


<!-- ================================================
     PAGE 1 — COVER
================================================ -->

<section class="domus-page">

    <div class="domus-page-content">

        <section class="print-cover">

            <div class="print-brand">

                DOMUS ISAACI

            </div>


            <h1>

                ${title}

            </h1>


            <div class="print-cover-line"></div>


            <p class="print-cover-subtitle">

                Naskah Buku

            </p>

        </section>

    </div>

</section>


<!-- ================================================
     PAGE 2 — TITLE PAGE
================================================ -->

<section class="domus-page">

    <div class="domus-page-content">

        <section class="print-title-page">

            <h1>

                ${title}

            </h1>


            <p>

                DOMUS ISAACI

            </p>


            <p>

                DOMUS Framework v1.1

            </p>

        </section>

    </div>

</section>


<!-- ================================================
     PAGE 3 — COPYRIGHT
================================================ -->

<section class="domus-page">

    <div class="domus-page-content">

        <section class="print-copyright">

            <h2>

                Hak Cipta

            </h2>


            <p>

                © 2026 DOMUS ISAACI

            </p>


            <p>

                Seluruh hak cipta dilindungi.

            </p>


            <p>

                Tidak diperkenankan memperbanyak,
                mendistribusikan, atau menggunakan
                sebagian maupun seluruh isi buku ini
                tanpa izin dari pemegang hak cipta,
                kecuali untuk keperluan yang diizinkan
                oleh hukum yang berlaku.

            </p>

        </section>

    </div>

</section>


<!-- ================================================
     PAGE 4 — DAFTAR ISI
================================================ -->

<section class="domus-page">

    <div class="domus-page-content">

        <section class="print-toc">

            <h2>
                Daftar Isi
            </h2>


            ${this.renderTOC()}

        </section>

    </div>


    <div
        class="print-page-number"
        aria-hidden="true">

        i

    </div>

</section>


<!-- ================================================
     MAIN MATTER — BAB
================================================ -->

${(
    Array.isArray(this.document.chapters)
        ? this.document.chapters
        : []
)
    .map((chapter, index) => {

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
                .map(paragraph => {

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

                })
                .join("");


        return `

<section class="domus-page">

    <div class="domus-page-content">

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

                    `<p>
                        <em>
                            Bab ini belum memiliki isi.
                        </em>
                    </p>`
                }

            </div>


            <footer class="print-footer">

                <span>
                    DOMUS ISAACI
                </span>

            </footer>

        </section>

    </div>


    <div
        class="print-page-number"
        aria-hidden="true">

        ${index + 1}

    </div>

</section>

`;

    })
    .join("")}


<!-- ================================================
     END PAGE
================================================ -->

<section class="domus-page">

    <div class="domus-page-content">

        <section class="print-end">

            DOMUS Framework v1.1

        </section>

    </div>

</section>


</div>


</section>

`;

}
