/*
====================================================
DOMUS Framework v1.2
Export Page
====================================================

Fungsi:

1. Membaca manuscript dari PublishService
2. Menampilkan informasi buku
3. Menampilkan daftar isi
4. Menampilkan naskah
5. Membentuk halaman fisik A5
6. Memberikan nomor halaman
7. Roman numeral untuk front matter
8. Arabic numeral untuk manuscript
9. Menyembunyikan UI aplikasi saat print
10. Membuka dialog Print / Save as PDF

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

        this.paginationReady = false;

    }


    /*
    ====================================================
    LOAD
    ====================================================
    */

    async load() {

        this.document = null;

        this.paginationReady = false;

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
    ROMAN NUMERAL
    ====================================================
    */

    toRoman(number) {

        const values = [
            [1000, "m"],
            [900, "cm"],
            [500, "d"],
            [400, "cd"],
            [100, "c"],
            [90, "xc"],
            [50, "l"],
            [40, "xl"],
            [10, "x"],
            [9, "ix"],
            [5, "v"],
            [4, "iv"],
            [1, "i"]
        ];


        let result = "";

        let value =
            Number(number);


        values.forEach(
            ([amount, symbol]) => {

                while (
                    value >= amount
                ) {

                    result += symbol;

                    value -= amount;

                }

            }
        );


        return result;

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

<section
    class="print-chapter"
    data-chapter="${number}"
>

    <div class="chapter-source">

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

            <span>
                DOMUS ISAACI
            </span>

        </footer>

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

    padding:
        30px
        20px
        80px;

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

    border:
        1px solid #ddd;

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
COMMON PAGE
====================================================
*/

.print-page {

    position: relative;

    box-sizing: border-box;

    background: #fff;

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

    height: 5mm;

    display: flex;

    align-items: center;

    justify-content: center;

    font-family:
        Arial,
        sans-serif;

    font-size: 8pt;

    line-height: 1;

    color: #888;

    pointer-events: none;

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

    padding:
        70px
        55px;

    box-sizing: border-box;

}


.print-brand {

    font-family:
        Arial,
        sans-serif;

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

    border-top:
        2px solid #222;

    margin:
        45px 0;

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

.print-title-page {

    min-height: 900px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    padding: 60px;

    box-sizing: border-box;

}


.print-title-page h1 {

    max-width: 520px;

    font-size: 28px;

    line-height: 1.45;

    font-weight: 600;

    margin:
        0 0 35px 0;

}


.print-title-page p {

    margin:
        8px 0;

    font-size: 14px;

    color: #666;

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
COPYRIGHT
====================================================
*/

.print-copyright {

    min-height: 700px;

    padding:
        80px
        55px;

    box-sizing: border-box;

    display: flex;

    align-items: flex-end;

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
TABLE OF CONTENTS
====================================================
*/

.print-toc {

    min-height: 700px;

    padding:
        70px
        55px;

    box-sizing: border-box;

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

    padding:
        11px 0;

    border-bottom:
        1px dotted #aaa;

    font-size: 14px;

}


.print-toc-item span {

    display: block;

}


/*
====================================================
CHAPTER SOURCE
====================================================
*/

.print-chapter {

    box-sizing: border-box;

}


.chapter-source {

    box-sizing: border-box;

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
END PAGE
====================================================
*/

.print-end {

    text-align: center;

    padding:
        80px
        40px;

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
    A5 PAGE
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


    /*
    ====================================================
    HIDE APPLICATION UI
    ====================================================
    */

    body * {

        visibility: hidden;

    }


    /*
    ====================================================
    SHOW BOOK ONLY
    ====================================================
    */

    .print-book,
    .print-book * {

        visibility: visible;

    }


    /*
    ====================================================
    PRINT BOOK CONTAINER
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
    PHYSICAL A5 PAGE
    ====================================================
    */

    .print-page {

        width: 100%;

        height: 170mm;

        min-height: 170mm;

        max-height: 170mm;

        box-sizing: border-box;

        position: relative;

        overflow: hidden;

        page-break-after: always;

        break-after: page;

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
    TITLE PAGE
    ====================================================
    */

    .print-title-page {

        height: 170mm;

        min-height: 170mm;

        padding:
            20mm
            15mm;

        box-sizing: border-box;

        display: flex;

        flex-direction: column;

        justify-content: center;

        align-items: center;

        text-align: center;

    }


    /*
    ====================================================
    COPYRIGHT
    ====================================================
    */

    .print-copyright {

        height: 170mm;

        min-height: 170mm;

        padding:
            20mm
            15mm;

        box-sizing: border-box;

        display: flex;

        align-items: flex-end;

    }


    /*
    ====================================================
    TABLE OF CONTENTS
    ====================================================
    */

    .print-toc {

        height: 170mm;

        min-height: 170mm;

        padding:
            15mm
            5mm;

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

        height: 5mm;

        margin: 0;

        display: flex;

        align-items: center;

        justify-content: center;

        font-family:
            Arial,
            sans-serif;

        font-size: 8pt;

        line-height: 1;

        color: #888;

    }


    /*
    ====================================================
    CHAPTER PAGE
    ====================================================
    */

    .print-chapter-page {

        height: 170mm;

        min-height: 170mm;

        max-height: 170mm;

        padding:
            10mm
            12mm
            15mm;

        box-sizing: border-box;

        position: relative;

        overflow: hidden;

    }


    /*
    ====================================================
    CHAPTER HEADING
    ====================================================
    */

    .print-chapter-page
    .print-chapter-heading {

        margin-bottom: 12mm;

        text-align: left;

    }


    .print-chapter-page
    .print-chapter-number {

        font-size: 9pt;

        letter-spacing: 2px;

        margin-bottom: 4mm;

    }


    .print-chapter-page
    h2 {

        font-size: 20pt;

        line-height: 1.3;

        margin: 0;

        page-break-after: avoid;

        break-after: avoid;

    }


    /*
    ====================================================
    CHAPTER CONTENT
    ====================================================
    */

    .print-chapter-page
    .print-chapter-content {

        font-size: 11.5pt;

        line-height: 1.7;

        text-align: justify;

    }


    .print-chapter-page
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
    CONTINUATION PAGE
    ====================================================
    */

    .print-continuation {

        padding-top: 15mm;

    }


    /*
    ====================================================
    CHAPTER FOOTER
    ====================================================
    */

    .print-chapter-page
    .print-footer {

        margin-top: 10mm;

        padding-top: 3mm;

        font-size: 8pt;

    }


    /*
    ====================================================
    END
    ====================================================
    */

    .print-end {

        height: 170mm;

        min-height: 170mm;

        box-sizing: border-box;

        text-align: center;

        padding:
            30mm
            10mm;

    }


    /*
    ====================================================
    BUTTON
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


    .print-page {

        margin-bottom: 20px;

        border:
            1px solid #ddd;

        box-shadow:
            0 2px 8px
            rgba(0,0,0,0.08);

    }

}

</style>


<section class="domus-export">


<h1>
    📕 Export Buku
</h1>


<p style="color:#666;">

    DOMUS Publisher v1.2

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


<!-- COVER -->

<section class="print-page print-cover">

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

<section class="print-page print-title-page">

    <div class="print-page-number">
        i
    </div>


    <div class="title-page-spacer"></div>


    <h1>

        ${title}

    </h1>


    <div class="title-page-line"></div>


    <p class="title-page-brand">

        DOMUS ISAACI

    </p>


    <p class="title-page-publisher">

        DOMUS Framework v1.2

    </p>

</section>


<!-- COPYRIGHT PAGE -->

<section class="print-page print-copyright">

    <div class="print-page-number">
        ii
    </div>


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

<section class="print-page print-toc">

    <div class="print-page-number">
        iii
    </div>


    <h2>
        Daftar Isi
    </h2>


    ${this.renderTOC()}

</section>


<!-- MANUSCRIPT SOURCE -->

<div
    id="manuscriptSource"
    class="manuscript-source">

    ${this.renderChapters()}

</div>


<!-- END PAGE SOURCE -->

<section
    id="endPageSource"
    class="print-page print-end">

    <div class="print-page-number">
    </div>


    DOMUS Framework v1.2

</section>


</div>


</section>

`;

    }


    /*
    ====================================================
    PAGINATION HELPERS
    ====================================================
    */

    createPageNumber(number) {

        const element =
            document.createElement("div");


        element.className =
            "print-page-number";


        element.textContent =
            String(number);


        return element;

    }


    /*
    ====================================================
    CREATE CHAPTER PAGE
    ====================================================
    */

    createChapterPage(
        chapterNumber,
        title,
        continuation = false
    ) {

        const page =
            document.createElement("div");


        page.className =
            "print-page print-chapter-page";


        if (continuation) {

            page.classList.add(
                "print-continuation"
            );

        }


        const heading =
            document.createElement("div");


        heading.className =
            "print-chapter-heading";


        if (!continuation) {

            const chapterLabel =
                document.createElement("div");


            chapterLabel.className =
                "print-chapter-number";


            chapterLabel.textContent =
                `BAB ${chapterNumber}`;


            heading.appendChild(
                chapterLabel
            );


            const headingTitle =
                document.createElement("h2");


            headingTitle.textContent =
                title;


            heading.appendChild(
                headingTitle
            );

        }


        page.appendChild(
            heading
        );


        const content =
            document.createElement("div");


        content.className =
            "print-chapter-content";


        page.appendChild(
            content
        );


        return page;

    }


    /*
    ====================================================
    CREATE CHAPTER FOOTER
    ====================================================
    */

    createChapterFooter() {

        const footer =
            document.createElement("footer");


        footer.className =
            "print-footer";


        const span =
            document.createElement("span");


        span.textContent =
            "DOMUS ISAACI";


        footer.appendChild(
            span
        );


        return footer;

    }


    /*
    ====================================================
    CHECK PAGE HEIGHT
    ====================================================
    */

    pageHasRoom(
        page,
        element
    ) {

        const content =
            page.querySelector(
                ".print-chapter-content"
            );


        if (!content) {

            return false;

        }


        const currentHeight =
            content.scrollHeight;


        const elementHeight =
            element.getBoundingClientRect().height;


        const pageHeight =
            page.clientHeight;


        const headingHeight =
            page.querySelector(
                ".print-chapter-heading"
            )?.getBoundingClientRect()
                .height || 0;


        const footerSpace =
            18 * 3.78;


        const available =
            pageHeight -
            headingHeight -
            footerSpace -
            15 * 3.78;


        return (
            currentHeight +
            elementHeight
        ) <= available;

    }


    /*
    ====================================================
    SPLIT LARGE PARAGRAPH
    ====================================================
    */

    splitParagraph(
        paragraph,
        page,
        nextPage
    ) {

        const text =
            paragraph.textContent || "";


        const words =
            text.split(/\s+/);


        if (!words.length) {

            return true;

        }


        const firstPart =
            document.createElement("p");


        const secondPart =
            document.createElement("p");


        let firstText = "";


        let secondText = "";


        for (
            let index = 0;
            index < words.length;
            index++
        ) {

            const candidate =
                firstText
                    ? `${firstText} ${words[index]}`
                    : words[index];


            firstPart.textContent =
                candidate;


            const content =
                page.querySelector(
                    ".print-chapter-content"
                );


            if (!content) {

                break;

            }


            content.appendChild(
                firstPart
            );


            const height =
                content.scrollHeight;


            const pageHeight =
                page.clientHeight;


            const headingHeight =
                page.querySelector(
                    ".print-chapter-heading"
                )?.getBoundingClientRect()
                    .height || 0;


            const available =
                pageHeight -
                headingHeight -
                (15 * 3.78);


            if (height > available) {

                content.removeChild(
                    firstPart
                );

                secondText =
                    words
                        .slice(index)
                        .join(" ");

                break;

            }


            firstText =
                candidate;

            content.removeChild(
                firstPart
            );

        }


        if (!firstText) {

            return false;

        }


        firstPart.textContent =
            firstText;


        page.querySelector(
            ".print-chapter-content"
        ).appendChild(
            firstPart
        );


        if (secondText) {

            secondPart.textContent =
                secondText;


            nextPage.querySelector(
                ".print-chapter-content"
            ).appendChild(
                secondPart
            );

        }


        return true;

    }


    /*
    ====================================================
    PAGINATE CHAPTER
    ====================================================
    */

    paginateChapter(
        source,
        chapterNumber,
        title
    ) {

        const pages = [];


        const paragraphs =
            Array.from(
                source.querySelectorAll(
                    ".print-chapter-content p"
                )
            );


        let page =
            this.createChapterPage(
                chapterNumber,
                title,
                false
            );


        this.element
            .querySelector(
                "#paginationPages"
            )
            .appendChild(
                page
            );


        pages.push(page);


        paragraphs.forEach(
            paragraph => {

                const clone =
                    paragraph.cloneNode(true);


                const content =
                    page.querySelector(
                        ".print-chapter-content"
                    );


                content.appendChild(
                    clone
                );


                const pageHeight =
                    page.clientHeight;


                const contentHeight =
                    content.scrollHeight;


                const headingHeight =
                    page.querySelector(
                        ".print-chapter-heading"
                    )?.getBoundingClientRect()
                        .height || 0;


                const available =
                    pageHeight -
                    headingHeight -
                    (18 * 3.78);


                if (
                    contentHeight >
                    available
                ) {

                    content.removeChild(
                        clone
                    );


                    const nextPage =
                        this.createChapterPage(
                            chapterNumber,
                            title,
                            true
                        );


                    this.element
                        .querySelector(
                            "#paginationPages"
                        )
                        .appendChild(
                            nextPage
                        );


                    pages.push(
                        nextPage
                    );


                    nextPage
                        .querySelector(
                            ".print-chapter-content"
                        )
                        .appendChild(
                            clone
                        );


                    page =
                        nextPage;

                }

            }
        );


        /*
        --------------------------------------------
        FOOTER
        --------------------------------------------
        */

        const lastPage =
            pages[
                pages.length - 1
            ];


        lastPage.appendChild(
            this.createChapterFooter()
        );


        return pages;

    }


    /*
    ====================================================
    BUILD PHYSICAL PAGINATION
    ====================================================
    */

    buildPagination() {

        if (this.paginationReady) {

            return;

        }


        const source =
            this.element.querySelector(
                "#manuscriptSource"
            );


        const target =
            this.element.querySelector(
                "#paginationPages"
            );


        if (!source || !target) {

            return;

        }


        target.innerHTML = "";


        const chapters =
            Array.from(
                source.querySelectorAll(
                    ".print-chapter"
                )
            );


        chapters.forEach(
            chapter => {

                const chapterNumber =
                    chapter.dataset.chapter;


                const title =
                    chapter.querySelector(
                        ".print-chapter-heading h2"
                    )?.textContent ||
                    `Bab ${chapterNumber}`;


                this.paginateChapter(
                    chapter,
                    chapterNumber,
                    title
                );

            }
        );


        /*
        --------------------------------------------
        END PAGE
        --------------------------------------------
        */

        const endSource =
            this.element.querySelector(
                "#endPageSource"
            );


        if (endSource) {

            const endPage =
                endSource.cloneNode(true);


            target.appendChild(
                endPage
            );

        }


        /*
        --------------------------------------------
        REMOVE SOURCE
        --------------------------------------------
        */

        source.remove();


        if (endSource) {

            endSource.remove();

        }


        this.paginationReady =
            true;


        this.assignArabicPageNumbers();

    }


    /*
    ====================================================
    ASSIGN ARABIC PAGE NUMBERS
    ====================================================
    */

    assignArabicPageNumbers() {

        const pages =
            this.element.querySelectorAll(
                "#paginationPages .print-chapter-page"
            );


        pages.forEach(
            (page, index) => {

                const number =
                    index + 1;


                let numberElement =
                    page.querySelector(
                        ".print-page-number"
                    );


                if (!numberElement) {

                    numberElement =
                        this.createPageNumber(
                            number
                        );


                    page.appendChild(
                        numberElement
                    );

                }


                numberElement.textContent =
                    String(number);

            }
        );

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


        /*
        --------------------------------------------
        CREATE PAGINATION TARGET
        --------------------------------------------
        */

        const printBook =
            this.element.querySelector(
                ".print-book"
            );


        if (printBook) {

            const pagination =
                document.createElement("div");


            pagination.id =
                "paginationPages";


            pagination.className =
                "pagination-pages";


            printBook.appendChild(
                pagination
            );

        }


        /*
        --------------------------------------------
        WAIT FOR LAYOUT
        --------------------------------------------
        */

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        this.buildPagination();

                    }
                );

            }
        );


        console.log(
            "DOMUS Export v1.2 rendered.",
            this.document
        );

    }

}
