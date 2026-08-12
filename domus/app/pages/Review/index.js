/*
====================================================
DOMUS Framework v1.0
Review Page
====================================================

Fungsi:

1. Memeriksa buku aktif
2. Memeriksa judul buku
3. Memeriksa jumlah bab
4. Memeriksa judul setiap bab
5. Memeriksa isi setiap bab
6. Menghitung jumlah kata
7. Memberikan peringatan untuk bab yang terlalu pendek
8. Menampilkan ringkasan naskah

Review TIDAK mengubah naskah.

Alur:

BookService
    ↓
ChapterService
    ↓
PublishService
    ↓
ReviewPage
====================================================
*/

import Page from "../../core/Page.js";

import PublishService
    from "../../services/PublishService.js";


export default class ReviewPage extends Page {


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
                "DOMUS Review Error:",
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
    HITUNG KATA
    ====================================================
    */

    countWords(text = "") {

        const clean =
            String(text).trim();

        if (!clean) {

            return 0;

        }

        return clean
            .split(/\s+/)
            .filter(Boolean)
            .length;

    }


    /*
    ====================================================
    STATUS CHECK
    ====================================================
    */

    checkBook() {

        return !!(
            this.document &&
            this.document.book
        );

    }


    checkBookTitle() {

        if (
            !this.document ||
            !this.document.book
        ) {

            return false;

        }

        return !!String(
            this.document.book.title || ""
        ).trim();

    }


    checkChapters() {

        return !!(
            this.document &&
            Array.isArray(
                this.document.chapters
            ) &&
            this.document.chapters.length > 0
        );

    }


    /*
    ====================================================
    VALIDASI BAB
    ====================================================
    */

    getChapterChecks() {

        if (
            !this.document ||
            !Array.isArray(
                this.document.chapters
            )
        ) {

            return [];

        }


        return this.document.chapters.map(

            (chapter, index) => {

                const number =
                    chapter.number ||
                    index + 1;


                const title =
                    String(
                        chapter.title || ""
                    ).trim();


                const content =
                    String(
                        chapter.content || ""
                    ).trim();


                const wordCount =
                    this.countWords(
                        content
                    );


                return {

                    number,

                    title,

                    content,

                    wordCount,

                    hasTitle:
                        title.length > 0,

                    hasContent:
                        wordCount > 0

                };

            }

        );

    }


    /*
    ====================================================
    RENDER CHECK
    ====================================================
    */

    renderCheck(
        passed,
        text
    ) {

        return `

<div
style="
display:flex;
align-items:center;
gap:10px;
padding:8px 0;
">

<span
style="
font-size:20px;
">

${passed ? "✓" : "✗"}

</span>

<span>

${text}

</span>

</div>

`;

    }


    /*
    ====================================================
    RENDER BAB
    ====================================================
    */

    renderChapterChecks() {

        const chapters =
            this.getChapterChecks();


        if (chapters.length === 0) {

            return `

<div
class="domus-card"
style="
padding:16px;
border:1px solid #ddd;
border-radius:8px;
">

<p>

Belum ada bab untuk diperiksa.

</p>

</div>

`;

        }


        return chapters.map(

            (chapter) => {

                /*
                ----------------------------------------
                STATUS PANJANG NASKAH
                ----------------------------------------
                */

                let lengthStatus =
                    "";


                if (
                    chapter.wordCount === 0
                ) {

                    lengthStatus = `

<span
style="
color:#b00020;
">

✗ Bab masih kosong

</span>

`;

                }

                else if (
                    chapter.wordCount < 50
                ) {

                    lengthStatus = `

<span
style="
color:#9a6700;
">

⚠ Naskah sangat pendek

</span>

`;

                }

                else {

                    lengthStatus = `

<span
style="
color:#176b2c;
">

✓ Isi tersedia

</span>

`;

                }


                return `

<div
class="domus-review-chapter"
style="
margin-top:16px;
padding:18px;
border:1px solid #ddd;
border-radius:8px;
">


<h3
style="
margin-top:0;
">

Bab ${chapter.number}

</h3>


<p>

<strong>
Judul:
</strong>

${
    chapter.hasTitle

        ? this.escapeHTML(
            chapter.title
        )

        : `

<span
style="
color:#b00020;
">

Belum ada judul

</span>

`
}

</p>


<p>

<strong>
Jumlah Kata:
</strong>

${chapter.wordCount}

</p>


<p>

${lengthStatus}

</p>


</div>

`;

            }

        ).join("");

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
class="domus-review"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px;
">

<h1>
Review Naskah
</h1>

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
">

<h3>
⚠ Tidak dapat memuat naskah
</h3>

<p>

Pastikan buku aktif tersedia.

</p>

</div>

</section>

`;

        }


        /*
        ================================================
        DATA
        ================================================
        */

        const book =
            this.document.book || {};


        const title =
            this.escapeHTML(
                book.title ||
                "Tanpa Judul"
            );


        const chapters =
            this.getChapterChecks();


        const totalChapters =
            chapters.length;


        const totalWords =
            this.document.totalWords ||
            0;


        /*
        ================================================
        VALIDASI UTAMA
        ================================================
        */

        const hasBook =
            this.checkBook();


        const hasTitle =
            this.checkBookTitle();


        const hasChapters =
            this.checkChapters();


        const allTitlesValid =
            chapters.length > 0 &&
            chapters.every(
                chapter =>
                    chapter.hasTitle
            );


        const allChaptersHaveContent =
            chapters.length > 0 &&
            chapters.every(
                chapter =>
                    chapter.hasContent
            );


        const ready =
            hasBook &&
            hasTitle &&
            hasChapters &&
            allTitlesValid &&
            allChaptersHaveContent;


        /*
        ================================================
        STATUS AKHIR
        ================================================
        */

        const finalStatus =
            ready

                ? `

<div
style="
padding:18px;
border:2px solid #2e7d32;
border-radius:8px;
margin-top:25px;
">

<h3
style="
margin-top:0;
">

✓ Naskah Lolos Pemeriksaan Dasar

</h3>

<p>

Naskah memiliki buku, judul,
bab, dan isi.

</p>

<p>

Naskah dapat dilanjutkan ke
Preview atau Publish.

</p>

</div>

`

                : `

<div
style="
padding:18px;
border:2px solid #b00020;
border-radius:8px;
margin-top:25px;
">

<h3
style="
margin-top:0;
">

⚠ Naskah Belum Lolos Pemeriksaan

</h3>

<p>

Periksa kembali bagian yang
bertanda ✗ atau ⚠.

</p>

</div>

`;


        return `

<section
class="domus-review"
style="
max-width:900px;
margin:0 auto;
padding:30px 20px 80px 20px;
">


<!-- ================================================
     HEADER
================================================ -->

<h1>

🔎 Review Naskah

</h1>


<p
style="
color:#666;
">

DOMUS Publisher v1.0 — Pemeriksaan
sebelum Preview dan Publish.

</p>


<!-- ================================================
     IDENTITAS BUKU
================================================ -->

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
     PEMERIKSAAN UMUM
================================================ -->

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">


<h2>

Pemeriksaan Umum

</h2>


${this.renderCheck(
    hasBook,
    "Buku aktif tersedia"
)}


${this.renderCheck(
    hasTitle,
    "Judul buku tersedia"
)}


${this.renderCheck(
    hasChapters,
    "Minimal satu bab tersedia"
)}


${this.renderCheck(
    allTitlesValid,
    "Semua bab memiliki judul"
)}


${this.renderCheck(
    allChaptersHaveContent,
    "Semua bab memiliki isi"
)}


</div>


<!-- ================================================
     PEMERIKSAAN PER BAB
================================================ -->

<div
style="
margin-top:35px;
">


<h2>

Pemeriksaan Setiap Bab

</h2>


${this.renderChapterChecks()}


</div>


<!-- ================================================
     STATUS AKHIR
================================================ -->

${finalStatus}


<!-- ================================================
     RINGKASAN
================================================ -->

<div
class="domus-card"
style="
padding:20px;
border:1px solid #ddd;
border-radius:8px;
margin-top:25px;
">


<h2>

Ringkasan

</h2>


<p>

<strong>
Bab:
</strong>

${totalChapters}

</p>


<p>

<strong>
Kata:
</strong>

${totalWords}

</p>


<p>

<strong>
Status:
</strong>

${
    ready
        ? "Siap"
        : "Perlu diperiksa"
}

</p>


</div>


<!-- ================================================
     CATATAN
================================================ -->

<div
style="
margin-top:35px;
padding:18px;
background:#f7f7f7;
border-radius:8px;
">

<p
style="
margin-top:0;
">

<strong>
Catatan:
</strong>

</p>

<p>

Review tidak mengubah isi naskah.
Pemeriksaan hanya membaca data
manuscript.

</p>

<p
style="
margin-bottom:0;
">

Peringatan "naskah sangat pendek"
bukan error. Itu hanya pengingat
bahwa isi bab masih sedikit.

</p>

</div>


<!-- ================================================
     FOOTER
================================================ -->

<div
style="
margin-top:60px;
padding-top:25px;
border-top:1px solid #ddd;
text-align:center;
color:#777;
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

        console.log(
            "DOMUS Review rendered.",
            this.document
        );

    }

}
