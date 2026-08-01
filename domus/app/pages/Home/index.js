/*
====================================================
DOMUS Home Page
====================================================
*/

import Page from "../../core/Page.js";
import BookService from "../../services/BookService.js";
import Router from "../../core/Router.js";

export default class HomePage extends Page {

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

<section class="domus-home">

<h1>Selamat Datang di DOMUS</h1>

<p>

Pilih buku untuk mulai menulis.

</p>

<div id="books">

${this.renderBooks()}

</div>

</section>

`;

    }

    renderBooks() {

        if(this.books.length===0){

            return `

<p>

Belum ada buku.

</p>

`;

        }

        return this.books.map(book=>`

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

    afterRender(){

        this.element

        .querySelectorAll(".domus-book")

        .forEach(card=>{

            card.onclick=()=>{

                const id=card.dataset.id;

                const book=this.books.find(

                    b=>b.id===id

                );

                if (!book) {

                    return;

                 }

                 BookService.setActive(book);

                 Router.go("editor");

            };

        });

    }

}
