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

        return;

    }

    this.chapter =

        ChapterService.getActive()

        ||

        chapters[0];

    ChapterService.setActive(

        this.chapter

    );

}

    renderChapterList() {

    const chapters = ChapterService.getAll();

    return chapters.map(chapter => `

<div
class="domus-chapter-item ${this.chapter && this.chapter.id === chapter.id ? "active" : ""}"
data-id="${chapter.id}">

${chapter.title}

</div>

`).join("");

}
    
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
>${this.chapter.content}</textarea>

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

    const editor = this.element.querySelector("#editor");

    const status = this.element.querySelector("#save-status");

    const counter = this.element.querySelector("#word-count");

    editor.addEventListener("input", (event) => {

        status.textContent = "Menyimpan...";

        ChapterService.update(

            this.chapter.id,

            event.target.value

        );

        const words = event.target.value
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;

        counter.textContent = `${words} kata`;

        status.textContent = "Tersimpan";

    });

}

}    
