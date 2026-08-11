/*
====================================================
DOMUS Framework v1.0
Publish Service
====================================================
*/

import Service from "../core/Service.js";

import BookService from "./BookService.js";
import ChapterService from "./ChapterService.js";


class PublishService extends Service {

    constructor() {

        super("PublishService");

    }


    /*
    ====================================================
    INITIALIZE
    ====================================================
    */

    async initialize() {

        this.log(
            "PublishService initialized."
        );

    }


    /*
    ====================================================
    GET BOOK
    ====================================================
    */

    getBook() {

        return BookService.getActive();

    }


    /*
    ====================================================
    GET ALL CHAPTERS
    ====================================================
    */

    getChapters() {

        return ChapterService.getAll();

    }


    /*
    ====================================================
    HITUNG KATA
    ====================================================
    */

    countWords(text = "") {

        const cleanText =
            text.trim();

        if (!cleanText) {

            return 0;

        }

        return cleanText
            .split(/\s+/)
            .filter(Boolean)
            .length;

    }


    /*
    ====================================================
    TOTAL KATA
    ====================================================
    */

    getTotalWords(chapters = []) {

        return chapters.reduce(

            (total, chapter) => {

                return total +
                    this.countWords(
                        chapter.content || ""
                    );

            },

            0

        );

    }


    /*
    ====================================================
    BUILD DOCUMENT
    ====================================================
    */

    async build() {

        const book =
            this.getBook();

        if (!book) {

            throw new Error(
                "Tidak ada buku aktif."
            );

        }


        const chapters =
            this.getChapters();


        if (!chapters ||
            chapters.length === 0) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }


        const totalWords =
            this.getTotalWords(
                chapters
            );


        if (totalWords === 0) {

            throw new Error(
                "Naskah masih kosong."
            );

        }


        /*
        ================================================
        DOCUMENT
        ================================================
        */

        const document = {

            book: {

                id: book.id,

                title: book.title

            },


            chapters: chapters.map(
                chapter => ({

                    id: chapter.id,

                    title: chapter.title,

                    content:
                        chapter.content || "",

                    wordCount:
                        this.countWords(
                            chapter.content || ""
                        )

                })
            ),


            totalChapters:
                chapters.length,


            totalWords:
                totalWords,


            generatedAt:
                new Date().toISOString()

        };


        this.log(
            "DOMUS document built."
        );


        return document;

    }


    /*
    ====================================================
    PREVIEW
    ====================================================
    */

    async preview() {

        const document =
            await this.build();


        this.log(
            "Preview generated."
        );


        return document;

    }


    /*
    ====================================================
    PUBLISH
    ====================================================
    */

    async publish() {

        const document =
            await this.build();


        this.log(
            "Publishing DOMUS document..."
        );


        /*
        ================================================
        UNTUK SEKARANG:
        PUBLISH MASIH LOCAL
        ================================================

        Nanti bagian ini dapat kita sambungkan ke:

        - PDF generator
        - DOCX generator
        - EPUB
        - Markdown
        - GitHub
        - Cloud storage
        - DOMUS Publisher Engine

        ================================================
        */


        return {

            success: true,

            message:
                "Publish berhasil.",

            document

        };

    }

}


export default new PublishService();
