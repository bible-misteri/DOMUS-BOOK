/*
====================================================
DOMUS Framework v1.0
Book Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";

class BookService extends Service {

    constructor() {

        super("BookService");

        this.books = [];

    }

    async initialize() {

        this.books = Store.get("books") || [];

        this.log("BookService initialized.");

    }

    getAll() {

        return this.books;

    }

    getActive() {

        return Store.get("activeBook");

    }

    setActive(book) {

        Store.set("activeBook", book);

    }

    add(book) {

        this.books.push(book);

        Store.set("books", this.books);

    }

    update(id, data) {

        this.books = this.books.map(book => {

            if (book.id === id) {

                return {

                    ...book,

                    ...data

                };

            }

            return book;

        });

        Store.set("books", this.books);

    }

    remove(id) {

        this.books = this.books.filter(

            book => book.id !== id

        );

        Store.set("books", this.books);

    }

}

export default new BookService();
