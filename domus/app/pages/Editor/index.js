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

        const chapters = ChapterService.getAll();

        if (chapters.length === 0) {

            this.chapter = ChapterService.add("Bab 1");

        } else {

            this.chapter =
                ChapterService.getActive()
                || chapters[0];

            ChapterService.setActive(this.chapter);

        }

    }

    renderChapterList() {

        const chapters = ChapterService.getAll();

        return chapters.map(chapter => `

<div
class="domus-chapter-item ${this.chapter && this.chapter.id === chapter.id ? "active" : ""}"
data-id="${chapter.id}">

<span class="domus-chapter-title">
${chapter.title}
</span>

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

`).join("");

    }

    renderContent() {

        if (!this.book) {

            return `

<section class="domus-editor">

<h1>Editor</h1>

<p>Belum ada buku aktif.</p>

</section>

`;

        }

        return `

<section class="domus-editor">

<h1>${this.book.title}</h1>

<div class="domus-editor-layout">

<aside class="domus-chapters">

${this.renderChapterList()}

<button id="addChapter">

+ Tambah Bab

</button>

</aside>

<section class="domus-editor-panel">

<h3>${this.chapter.title}</h3>

<div id="save-status" class="domus-save-status">

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
        --------------------------------------------
        FUNGSI HITUNG KATA
        --------------------------------------------
        */

        const updateWordCount = (text) => {

            const words = text
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length;

            counter.textContent =
                `${words} kata`;

        };

        /*
        --------------------------------------------
        HITUNG SAAT EDITOR DIBUKA
        --------------------------------------------
        */

        updateWordCount(editor.value);

        /*
        --------------------------------------------
        AUTOSAVE + WORD COUNTER
        --------------------------------------------
        */

        editor.addEventListener("input", (event) => {

            status.textContent = "Menyimpan...";

            ChapterService.update(
                this.chapter.id,
                event.target.value
            );

            updateWordCount(event.target.value);

            status.textContent = "Tersimpan";

        });

        /*
        --------------------------------------------
        PILIH BAB
        --------------------------------------------
        */

        this.element
            .querySelectorAll(".domus-chapter-item")
            .forEach(item => {

                item.onclick = () => {

                    const chapter =
                        ChapterService.getById(
                            item.dataset.id
                        );

                    if (!chapter) {

                        return;

                    }

                    ChapterService.setActive(chapter);

                    Router.reload();

                };

            });

        /*
        --------------------------------------------
        RENAME BAB
        --------------------------------------------
        */

        this.element
            .querySelectorAll(".domus-rename-chapter")
            .forEach(button => {

                button.onclick = (event) => {

                    /*
                    Jangan biarkan klik tombol Rename
                    dianggap sebagai klik memilih Bab.
                    */

                    event.stopPropagation();

                    const id =
                        button.dataset.id;

                    const chapter =
                        ChapterService.getById(id);

                    if (!chapter) {

                        return;

                    }

                    const newTitle =
                        window.prompt(
                            "Nama Bab",
                            chapter.title
                        );

                    /*
                    Batal
                    */

                    if (newTitle === null) {

                        return;

                    }

                    const title =
                        newTitle.trim();

                    /*
                    Nama tidak boleh kosong
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

                    Router.reload();

                };

            });

        /*
        --------------------------------------------
        HAPUS BAB
        --------------------------------------------
        */

        this.element
            .querySelectorAll(".domus-delete-chapter")
            .forEach(button => {

                button.onclick = (event) => {

                    /*
                    Jangan biarkan klik tombol Hapus
                    dianggap sebagai klik memilih Bab.
                    */

                    event.stopPropagation();

                    const chapters =
                        ChapterService.getAll();

                    /*
                    --------------------------------
                    PERLINDUNGAN BAB TERAKHIR
                    --------------------------------
                    */

                    if (chapters.length <= 1) {

                        window.alert(
                            "Bab terakhir tidak dapat dihapus.\n\n" +
                            "Sebuah buku harus memiliki minimal satu bab."
                        );

                        return;

                    }

                    const id =
                        button.dataset.id;

                    const chapter =
                        ChapterService.getById(id);

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
                    HAPUS BAB
                    --------------------------------
                    */

                    ChapterService.remove(
                        chapter.id
                    );

                    /*
                    --------------------------------
                    PILIH BAB YANG MASIH ADA
                    --------------------------------
                    */

                    const remaining =
                        ChapterService.getAll();

                    if (remaining.length > 0) {

                        ChapterService.setActive(
                            remaining[0]
                        );

                    }

                    /*
                    --------------------------------
                    MUAT ULANG EDITOR
                    --------------------------------
                    */

                    Router.reload();

                };

            });

        /*
        --------------------------------------------
        TAMBAH BAB
        --------------------------------------------
        */

        const addButton =
            this.element.querySelector("#addChapter");

        if (addButton) {

            addButton.onclick = () => {

                ChapterService.add(
                    `Bab ${ChapterService.getAll().length + 1}`
                );

                Router.reload();

            };

        }

    }

}
