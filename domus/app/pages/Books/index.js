/*
====================================================
DOMUS Books Page
====================================================
*/

import Page from "../../core/Page.js";
import BookService from "../../services/BookService.js";
import Router from "../../core/Router.js";

export default class BooksPage extends Page {

    constructor() {

        super();

        this.books = [];

    }

    async load() {

        await BookService.initialize();

        this.books = BookService.getAll();

    }

    renderContent() {

        return `

<section class="domus-books">

<h1>Buku Saya</h1>

<p>
Kelola seluruh buku DOMUS.
</p>

<button
id="btnNewBook"
class="domus-btn domus-btn-primary">

+ Buku Baru

</button>

<hr>

<div id="bookList">

${this.renderBooks()}

</div>

</section>

`;

    }

    renderBooks() {

        if (this.books.length === 0) {

            return `

<p>
Belum ada buku.
</p>

`;

        }

        return this.books.map(book => `

<div
class="domus-card domus-book"
data-id="${book.id}">

<h3>${book.title}</h3>

<p>
${book.description ?? ""}
</p>

</div>

`).join("");

    }

    afterRender() {

        const button =
            this.element.querySelector("#btnNewBook");

        if (!button) {

            return;

        }

        button.onclick = async () => {

            const title = prompt(
                "Judul Buku"
            );

            if (!title || !title.trim()) {

                return;

            }

            const book = {

                id: crypto.randomUUID(),

                title: title.trim(),

                description: "",

                chapters: []

            };

            /*
            ----------------------------------------
            SIMPAN BUKU
            ----------------------------------------
            */

            BookService.add(book);

            /*
            ----------------------------------------
            JADIKAN BUKU SEBAGAI ACTIVE BOOK
            ----------------------------------------
            */

            BookService.setActive(book);

            /*
            ----------------------------------------
            LANGSUNG MASUK KE EDITOR
            ----------------------------------------
            */

            await Router.go("editor");

        };

        /*
        --------------------------------------------
        KLIK BUKU YANG SUDAH ADA
        --------------------------------------------
        */

        this.element
            .querySelectorAll(".domus-book")
            .forEach(card => {

                card.onclick = async () => {

                    const id = card.dataset.id;

                    const book = this.books.find(
                        item => item.id === id
                    );

                    if (!book) {

                        return;

                    }

                    BookService.setActive(book);

                    await Router.go("editor");

                };

            });

    }

}
