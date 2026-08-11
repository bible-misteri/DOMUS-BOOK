/*
====================================================
DOMUS Framework v1.0
Publish Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";

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
    GET ACTIVE BOOK
    ====================================================
    */

    getBook() {

        return Store.get(
            "activeBook"
        );

    }


    /*
    ====================================================
    GET ACTIVE CHAPTER
    ====================================================
    */

    getChapter() {

        return Store.get(
            "activeChapter"
        );

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
    COUNT WORDS
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
    BUILD DOCUMENT
    ====================================================
    */

    async build() {

        const book =
            this.getBook();


        /*
        --------------------------------------------
        CEK BUKU
        --------------------------------------------
        */

        if (!book) {

            throw new Error(
                "Tidak ada buku aktif."
            );

        }


        /*
        --------------------------------------------
        AMBIL SEMUA BAB
        --------------------------------------------
        */

        const chapters =
            this.getChapters();


        /*
        --------------------------------------------
        SALIN DATA BAB
        --------------------------------------------

        Kita membuat salinan sederhana
        supaya dokumen publish tidak
        mengubah data asli Store.
        --------------------------------------------
        */

        const documentChapters =
            chapters.map(
                (chapter, index) => {

                    return {

                        id:
                            chapter.id,

                        title:
                            chapter.title,

                        content:
                            chapter.content || "",

                        order:
                            index + 1,

                        wordCount:
                            this.countWords(
                                chapter.content || ""
                            )

                    };

                }
            );


        /*
        --------------------------------------------
        HITUNG TOTAL KATA
        --------------------------------------------
        */

        const totalWords =
            documentChapters.reduce(

                (total, chapter) => {

                    return total +
                        chapter.wordCount;

                },

                0

            );


        /*
        --------------------------------------------
        WAKTU GENERATE
        --------------------------------------------
        */

        const generatedAt =
            new Date().toISOString();


        /*
        ====================================================
        DOCUMENT
        ====================================================
        */

        return {

            /*
            --------------------------------------------
            METADATA
            --------------------------------------------
            */

            metadata: {

                title:
                    book.title,

                generatedAt,

                totalChapters:
                    documentChapters.length,

                totalWords

            },


            /*
            --------------------------------------------
            BOOK
            --------------------------------------------
            */

            book: {

                id:
                    book.id,

                title:
                    book.title

            },


            /*
            --------------------------------------------
            CHAPTERS
            --------------------------------------------
            */

            chapters:
                documentChapters,


            /*
            --------------------------------------------
            COMPATIBILITY
            --------------------------------------------

            Kita pertahankan generatedAt
            di level document supaya
            PublishPage lama tetap bekerja.
            --------------------------------------------
            */

            generatedAt

        };

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
            "Publishing..."
        );


        return {

            success:
                true,

            message:
                "Publish berhasil.",

            document

        };

    }

}


/*
====================================================
EXPORT SINGLETON
====================================================
*/

export default new PublishService();
