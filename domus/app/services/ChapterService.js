/*
====================================================
DOMUS Framework v1.0
Chapter Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";
import BookService from "./BookService.js";

class ChapterService extends Service {

    constructor() {

        super("ChapterService");

    }

    getAll() {

    const book = BookService.getActive();

    if (!book) {

        return [];

     }

    return book.chapters || [];

}

    getById(id) {

        return this.getAll().find(

            chapter => chapter.id === id

        );

}

    getActive() {

        const book = BookService.getActive();

        if (!book || !book.chapters) {

            return;

        }

        book.chapters = book.chapters.map(chapter => {

            if (chapter.id === id) {

                return {

                    ...chapter,

                    content

                };

            }

            return chapter;

        });

        BookService.update(book.id, {

            chapters: book.chapters

        });

        const active = book.chapters.find(c => c.id === id);

        if (active) {

            Store.set("activeChapter", active);

        }

    }

    rename(id, title) {

    const book = BookService.getActive();

    if (!book || !book.chapters) {

        return;

    }

    book.chapters = book.chapters.map(chapter => {

        if (chapter.id === id) {

            return {

                ...chapter,

                title

            };

        }

        return chapter;

    });

    BookService.update(book.id, {

        chapters: book.chapters

    });

    const active = book.chapters.find(

        chapter => chapter.id === id

    );

    if (active) {

        Store.set("activeChapter", active);

    }

}

    remove(id) {

        const book = BookService.getActive();

        if (!book || !book.chapters) {

            return;

        }

        book.chapters = book.chapters.filter(

            chapter => chapter.id !== id

        );

        BookService.update(book.id, {

            chapters: book.chapters

        });

        Store.set("activeChapter", null);

    }

}

export default new ChapterService();
