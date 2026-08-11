/*
====================================================
DOMUS Editor Page
====================================================
*/

import Page from "../../core/Page.js";
import Router from "../../core/Router.js";

import BookService from "../../services/BookService.js";
import ChapterService from "../../services/ChapterService.js";

export default class EditorPage extends Page {

    constructor() {

        super();

        this.book = null;
        this.chapter = null;

    }

    async load() {

        this.book = BookService.getActive();

        if (!this.book) {

            return;

        }

        let chapters = ChapterService.getAll();

        /*
        ====================================================
        JIKA BELUM ADA BAB
        ====================================================
        */

        if (chapters.length === 0) {

            this.chapter =
                ChapterService.add("Bab 1");

            ChapterService.setActive(this.chapter);

            return;

        }

        /*
        ====================================================
        RAPikan JUDUL BAB GENERIK
        ====================================================

        Jika judul masih berupa:

        Bab 1
        Bab 2
        Bab 3

        maka nomor mengikuti posisi aktual.

        Tetapi judul khusus hasil Rename seperti:

        Pendahuluan
        Mengapa Ishak Dilupakan?

        TIDAK diubah.
        */

        chapters.forEach((chapter, index) => {

            const expectedTitle =
                `Bab ${index + 1}`;

            const genericTitlePattern =
                /^Bab\s+\d+$/i;

            if (
                genericTitlePattern.test(
                    (chapter.title || "").trim()
                )
            ) {

                if (chapter.title !== expectedTitle) {

                    ChapterService.rename(
                        chapter.id,
                        expectedTitle
                    );

                }

            }

        });

        /*
        Ambil ulang setelah normalisasi.
        */

        chapters = ChapterService.getAll();

        /*
        ====================================================
        TENTUKAN BAB AKTIF
        ====================================================
        */

        this.chapter =
            ChapterService.getActive()
            || chapters[0];

        /*
        Pastikan bab aktif memang masih ada.
        */

        const activeExists =
            chapters.some(
                chapter =>
                    chapter.id === this.chapter.id
            );

        if (!activeExists) {

            this.chapter = chapters[0];

        }

        ChapterService.setActive(this.chapter);

    }

    /*
    ====================================================
    RENDER DAFTAR BAB
    ====================================================
    */

    renderChapterList() {

        const chapters =
            ChapterService.getAll();

        return chapters.map((chapter, index) => {

            const number =
                index + 1;

            const title =
                chapter.title || `Bab ${number}`;

            return `

<div
class="domus-chapter-item ${
    this.chapter &&
    this.chapter.id === chapter.id
        ? "active"
        : ""
}"
data-id="${chapter.id}">

<div class="domus-chapter-heading">

<strong>
Bab ${number}
</strong>

<span class="domus-chapter-title">
${title}
</span>

</div>

<div class="domus-chapter-actions">

<button
type="button"
class="domus-rename-chapter"
data-id="${chapter.id}">

✏️ Rename

</button>

<button
type="button"
class="domus-delete-chapter"
data-id="${chapter.id}">

🗑️ Hapus

</button>

</div>

</div>

`;

        }).join("");

    }

    /*
    ====================================================
    RENDER CONTENT
    ====================================================
    */

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-editor">

<h1>Editor</h1>

<p>Belum ada buku aktif.</p>

</section>

`;

        }

        const chapters =
            ChapterService.getAll();

        const currentIndex =
            chapters.findIndex(
                chapter =>
                    this.chapter &&
                    chapter.id === this.chapter.id
            );

        const currentNumber =
            currentIndex >= 0
                ? currentIndex + 1
                : 1;

        const currentTitle =
            this.chapter.title
            || `Bab ${currentNumber}`;

        return `

<section class="domus-editor">

<h1>${this.book.title}</h1>

<div class="domus-editor-layout">

<aside class="domus-chapters">

${this.renderChapterList()}

<button
id="addChapter"
type="button">

+ Tambah Bab

</button>

</aside>

<section class="domus-editor-panel">

<h3>
Bab ${currentNumber}
${currentTitle !== `Bab ${currentNumber}`
    ? ` — ${currentTitle}`
    : ""}
</h3>

<div
id="save-status"
class="domus-save-status">

Tersimpan

</div>

<textarea
id="editor"
class="domus-textarea"
rows="20"
placeholder="Mulailah menulis..."
>${this.chapter.content || ""}</textarea>

<div id="word-count">
0 kata
</div>

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

        if (!this.chapter) {

            return;

        }

        const editor =
            this.element.querySelector("#editor");

        const status =
            this.element.querySelector("#save-status");

        const counter =
            this.element.querySelector("#word-count");

        /*
        ====================================================
        HITUNG KATA
        ====================================================
        */

        const updateWordCount = (text) => {

            const cleanText =
                text.trim();

            const words =
                cleanText
                    ? cleanText
                        .split(/\s+/)
                        .filter(Boolean)
                        .length
                    : 0;

            counter.textContent =
                `${words} kata`;

        };

        /*
        ====================================================
        HITUNG SAAT EDITOR DIBUKA
        ====================================================
        */

        updateWordCount(
            editor.value
        );

        /*
        ====================================================
        AUTOSAVE + WORD COUNTER
        ====================================================
        */

        editor.addEventListener(
            "input",
            (event) => {

                status.textContent =
                    "Menyimpan...";

                ChapterService.update(
                    this.chapter.id,
                    event.target.value
                );

                updateWordCount(
                    event.target.value
                );

                status.textContent =
                    "Tersimpan";

            }
        );

        /*
        ====================================================
        PILIH BAB
        ====================================================
        */

        this.element
            .querySelectorAll(
                ".domus-chapter-item"
            )
            .forEach(item => {

                item.onclick = () => {

                    const chapter =
                        ChapterService.getById(
                            item.dataset.id
                        );

                    if (!chapter) {

                        return;

                    }

                    ChapterService.setActive(
                        chapter
                    );

                    Router.reload();

                };

            });

        /*
        ====================================================
        RENAME BAB
        ====================================================
        */

        this.element
            .querySelectorAll(
                ".domus-rename-chapter"
            )
            .forEach(button => {

                button.onclick =
                    (event) => {

                        event.stopPropagation();

                        const id =
                            button.dataset.id;

                        const chapter =
                            ChapterService.getById(
                                id
                            );

                        if (!chapter) {

                            return;

                        }

                        const newTitle =
                            window.prompt(
                                "Nama Bab",
                                chapter.title
                            );

                        /*
                        BATAL
                        */

                        if (
                            newTitle === null
                        ) {

                            return;

                        }

                        const title =
                            newTitle.trim();

                        /*
                        TIDAK BOLEH KOSONG
                        */

                        if (!title) {

                            window.alert(
                                "Nama Bab tidak boleh kosong."
                            );

                            return;

                        }

                        ChapterService.rename(
                            chapter.id,
                            title
                        );

                        /*
                        Tetap jadikan bab yang
                        di-Rename sebagai bab aktif.
                        */

                        ChapterService.setActive(
                            chapter
                        );

                        Router.reload();

                    };

            });

        /*
        ====================================================
        HAPUS BAB
        ====================================================
        */

        this.element
            .querySelectorAll(
                ".domus-delete-chapter"
            )
            .forEach(button => {

                button.onclick =
                    (event) => {

                        event.stopPropagation();

                        const chapters =
                            ChapterService.getAll();

                        /*
                        ====================================
                        PERLINDUNGAN BAB TERAKHIR
                        ====================================
                        */

                        if (
                            chapters.length <= 1
                        ) {

                            window.alert(

                                "Bab terakhir tidak dapat dihapus.\n\n" +

                                "Sebuah buku harus memiliki minimal satu bab."

                            );

                            return;

                        }

                        const id =
                            button.dataset.id;

                        const chapter =
                            ChapterService.getById(
                                id
                            );

                        if (!chapter) {

                            return;

                        }

                        /*
                        ====================================
                        KONFIRMASI
                        ====================================
                        */

                        const confirmed =
                            window.confirm(

                                `Hapus Bab "${chapter.title}"?\n\n` +

                                "Tulisan di dalam bab ini juga akan dihapus.\n\n" +

                                "Tindakan ini tidak dapat dibatalkan."

                            );

                        if (!confirmed) {

                            return;

                        }

                        /*
                        ====================================
                        HAPUS
                        ====================================
                        */

                        ChapterService.remove(
                            chapter.id
                        );

                        /*
                        ====================================
                        AMBIL BAB YANG TERSISA
                        ====================================
                        */

                        const remaining =
                            ChapterService.getAll();

                        if (
                            remaining.length > 0
                        ) {

                            /*
                            Pilih bab pertama
                            yang masih ada.
                            */

                            ChapterService.setActive(
                                remaining[0]
                            );

                        }

                        /*
                        ====================================
                        MUAT ULANG
                        ====================================
                        */

                        Router.reload();

                    };

            });

        /*
        ====================================================
        TAMBAH BAB
        ====================================================
        */

        const addButton =
            this.element.querySelector(
                "#addChapter"
            );

        if (addButton) {

            addButton.onclick = () => {

                const chapters =
                    ChapterService.getAll();

                const newNumber =
                    chapters.length + 1;

                const newChapter =
                    ChapterService.add(
                        `Bab ${newNumber}`
                    );

                /*
                Bab baru langsung menjadi
                bab aktif.
                */

                if (newChapter) {

                    ChapterService.setActive(
                        newChapter
                    );

                }

                Router.reload();

            };

        }

    }

}
