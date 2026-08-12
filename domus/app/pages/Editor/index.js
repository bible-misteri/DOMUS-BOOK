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


    /*
    ====================================================
    LOAD
    ====================================================
    */

    async load() {

        this.book =
            BookService.getActive();

        if (!this.book) {

            return;

        }


        let chapters =
            ChapterService.getAll();


        /*
        ====================================================
        JIKA BELUM ADA BAB
        ====================================================
        */

        if (chapters.length === 0) {

            this.chapter =
                ChapterService.add("Bab 1");

            ChapterService.setActive(
                this.chapter
            );

            return;

        }


        /*
        ====================================================
        RAPikan JUDUL BAB GENERIK
        ====================================================
        */

        chapters.forEach(
            (chapter, index) => {

                const expectedTitle =
                    `Bab ${index + 1}`;

                const genericTitlePattern =
                    /^Bab\s+\d+$/i;

                if (
                    genericTitlePattern.test(
                        (chapter.title || "").trim()
                    )
                ) {

                    if (
                        chapter.title !==
                        expectedTitle
                    ) {

                        ChapterService.rename(
                            chapter.id,
                            expectedTitle
                        );

                    }

                }

            }
        );


        /*
        ====================================================
        AMBIL ULANG BAB
        ====================================================
        */

        chapters =
            ChapterService.getAll();


        /*
        ====================================================
        TENTUKAN BAB AKTIF
        ====================================================
        */

        this.chapter =
            ChapterService.getActive()
            || chapters[0];


        /*
        ====================================================
        PASTIKAN BAB AKTIF MASIH ADA
        ====================================================
        */

        const activeExists =
            chapters.some(
                chapter =>
                    chapter.id ===
                    this.chapter.id
            );


        if (!activeExists) {

            this.chapter =
                chapters[0];

        }


        ChapterService.setActive(
            this.chapter
        );

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
            (chapter.title || "").trim();

        const genericTitlePattern =
            /^Bab\s+\d+$/i;

        /*
        ====================================================
        JIKA JUDUL MASIH GENERIK
        ====================================================
        */

        const displayTitle =
            genericTitlePattern.test(title)
                ? ""
                : title;

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

${
    displayTitle
        ? `
<span class="domus-chapter-title">
${displayTitle}
</span>
`
        : ""
}

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

<p>
Belum ada buku aktif.
</p>

</section>

`;

        }


        const chapters =
            ChapterService.getAll();


        const currentIndex =
            chapters.findIndex(
                chapter =>
                    this.chapter &&
                    chapter.id ===
                    this.chapter.id
            );


        const currentNumber =
            currentIndex >= 0
                ? currentIndex + 1
                : 1;


        const currentTitle =
            this.chapter?.title ||
            `Bab ${currentNumber}`;


        return `

<section class="domus-editor">


<h1>
${this.book.title}
</h1>


<div
class="domus-editor-layout">


<!-- =================================================
     DAFTAR BAB
================================================= -->

<aside
class="domus-chapters">


${this.renderChapterList()}


<button
id="addChapter"
type="button">

+ Tambah Bab

</button>


</aside>


<!-- =================================================
     EDITOR PANEL
================================================= -->

<section
class="domus-editor-panel">


<h3>
Bab ${currentNumber}
</h3>


<!-- =================================================
     JUDUL BAB
================================================= -->

<div
class="domus-editor-title">

<label
for="chapter-title">

<strong>
Judul Bab
</strong>

</label>


<input
id="chapter-title"
type="text"
value="${this.escapeHTML(currentTitle)}"
placeholder="Masukkan judul bab..."
class="domus-title-input"
/>

</div>


<div
id="title-save-status"
class="domus-save-status">

Tersimpan

</div>


<!-- =================================================
     ISI BAB
================================================= -->

<div
class="domus-editor-content">

<label
for="editor">

<strong>
Isi Bab
</strong>

</label>


<textarea
id="editor"
class="domus-textarea"
rows="20"
placeholder="Mulailah menulis..."
>${this.escapeHTML(
    this.chapter?.content || ""
)}</textarea>


</div>


<div
id="word-count">

0 kata

</div>


<div
id="save-status"
class="domus-save-status">

Tersimpan

</div>


</section>


</div>


</section>

`;

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
    AFTER RENDER
    ====================================================
    */

    afterRender() {

        if (!this.chapter) {

            return;

        }


        /*
        ====================================================
        ELEMENT
        ====================================================
        */

        const editor =
            this.element.querySelector(
                "#editor"
            );


        const titleInput =
            this.element.querySelector(
                "#chapter-title"
            );


        const status =
            this.element.querySelector(
                "#save-status"
            );


        const titleStatus =
            this.element.querySelector(
                "#title-save-status"
            );


        const counter =
            this.element.querySelector(
                "#word-count"
            );


        /*
        ====================================================
        HITUNG KATA
        ====================================================
        */

        const updateWordCount =
            (text) => {

                const cleanText =
                    String(text).trim();


                const words =
                    cleanText

                        ? cleanText
                            .split(/\s+/)
                            .filter(Boolean)
                            .length

                        : 0;


                if (counter) {

                    counter.textContent =
                        `${words} kata`;

                }

            };


        /*
        ====================================================
        HITUNG SAAT EDITOR DIBUKA
        ====================================================
        */

        if (editor) {

            updateWordCount(
                editor.value
            );

        }


        /*
        ====================================================
        SIMPAN JUDUL BAB
        ====================================================
        */

        if (titleInput) {

            titleInput.addEventListener(
                "input",
                (event) => {

                    const title =
                        event.target.value.trim();


                    if (titleStatus) {

                        titleStatus.textContent =
                            "Menyimpan...";

                    }


                    /*
                    ----------------------------------------
                    Jangan biarkan judul kosong
                    ----------------------------------------
                    */

                    if (!title) {

                        if (titleStatus) {

                            titleStatus.textContent =
                                "Judul belum disimpan.";

                        }

                        return;

                    }


                    ChapterService.rename(
                        this.chapter.id,
                        title
                    );


                    /*
                    ----------------------------------------
                    Update chapter aktif
                    ----------------------------------------
                    */

                    this.chapter =
                        ChapterService.getById(
                            this.chapter.id
                        );


                    if (titleStatus) {

                        titleStatus.textContent =
                            "Tersimpan";

                    }

                }
            );

        }


        /*
        ====================================================
        AUTOSAVE ISI BAB
        ====================================================
        */

        if (editor) {

            editor.addEventListener(
                "input",
                (event) => {

                    if (status) {

                        status.textContent =
                            "Menyimpan...";

                    }


                    ChapterService.update(
                        this.chapter.id,
                        event.target.value
                    );


                    updateWordCount(
                        event.target.value
                    );


                    if (status) {

                        status.textContent =
                            "Tersimpan";

                    }

                }
            );

        }


        /*
        ====================================================
        PILIH BAB
        ====================================================
        */

        this.element

            .querySelectorAll(
                ".domus-chapter-item"
            )

            .forEach(
                item => {

                    item.onclick =
                        () => {

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

                }
            );


        /*
        ====================================================
        RENAME BAB VIA BUTTON
        ====================================================
        */

        this.element

            .querySelectorAll(
                ".domus-rename-chapter"
            )

            .forEach(
                button => {

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
                            --------------------------------
                            BATAL
                            --------------------------------
                            */

                            if (
                                newTitle === null
                            ) {

                                return;

                            }


                            const title =
                                newTitle.trim();


                            /*
                            --------------------------------
                            TIDAK BOLEH KOSONG
                            --------------------------------
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


                            ChapterService.setActive(
                                ChapterService.getById(
                                    chapter.id
                                )
                            );


                            Router.reload();

                        };

                }
            );


        /*
        ====================================================
        HAPUS BAB
        ====================================================
        */

        this.element

            .querySelectorAll(
                ".domus-delete-chapter"
            )

            .forEach(
                button => {

                    button.onclick =
                        (event) => {

                            event.stopPropagation();


                            const chapters =
                                ChapterService.getAll();


                            /*
                            --------------------------------
                            BAB TERAKHIR
                            --------------------------------
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
                            --------------------------------
                            KONFIRMASI
                            --------------------------------
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
                            --------------------------------
                            HAPUS
                            --------------------------------
                            */

                            ChapterService.remove(
                                chapter.id
                            );


                            /*
                            --------------------------------
                            BAB TERSISA
                            --------------------------------
                            */

                            const remaining =
                                ChapterService.getAll();


                            if (
                                remaining.length > 0
                            ) {

                                ChapterService.setActive(
                                    remaining[0]
                                );

                            }


                            Router.reload();

                        };

                }
            );


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

            addButton.onclick =
                () => {

                    const chapters =
                        ChapterService.getAll();


                    const newNumber =
                        chapters.length + 1;


                    const newChapter =
                        ChapterService.add(
                            `Bab ${newNumber}`
                        );


                    /*
                    ----------------------------------------
                    BAB BARU AKTIF
                    ----------------------------------------
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
