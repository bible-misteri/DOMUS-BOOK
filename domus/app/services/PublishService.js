/*
====================================================
DOMUS Framework v1.0
Publish Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";


class PublishService extends Service {


    constructor() {

        super("PublishService");

    }


    async initialize() {

        this.log(
            "PublishService initialized."
        );

    }


    /*
    ====================================================
    BUKU AKTIF
    ====================================================
    */

    getBook() {

        return Store.get(
            "activeBook"
        );

    }


    /*
    ====================================================
    SELURUH BAB
    ====================================================
    */

    getChapters() {

        const chapters =
            Store.get(
                "chapters"
            );


        if (Array.isArray(chapters)) {

            return chapters;

        }


        return [];

    }


    /*
    ====================================================
    HITUNG KATA
    ====================================================
    */

    countWords(
        text = ""
    ) {

        const cleanText =
            String(text).trim();


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
    BUAT DATA BAB NORMAL
    ====================================================
    */

    normalizeChapter(
        chapter,
        index
    ) {

        const number =
            index + 1;


        const title =
            chapter?.title ||
            `Bab ${number}`;


        const content =
            String(
                chapter?.content || ""
            );


        const wordCount =
            this.countWords(
                content
            );


        return {

            ...chapter,

            number,

            title,

            content,

            wordCount

        };

    }


    /*
    ====================================================
    TOTAL KATA
    ====================================================
    */

    getTotalWords(
        chapters
    ) {

        return chapters.reduce(

            (
                total,
                chapter
            ) => {

                return total +
                    this.countWords(
                        chapter?.content || ""
                    );

            },

            0

        );

    }


    /*
    ====================================================
    BUAT TOC OTOMATIS
    ====================================================
    */

    buildTOC(
        chapters
    ) {

        return chapters.map(

            (
                chapter,
                index
            ) => {

                return {

                    number:
                        chapter.number ||
                        index + 1,

                    title:
                        chapter.title ||
                        `Bab ${index + 1}`

                };

            }

        );

    }


    /*
    ====================================================
    BUILD MANUSCRIPT
    ====================================================
    */

    async build() {


        /*
        --------------------------------------------
        BUKU
        --------------------------------------------
        */

        const book =
            this.getBook();


        if (!book) {

            throw new Error(
                "Tidak ada buku aktif."
            );

        }


        /*
        --------------------------------------------
        BAB
        --------------------------------------------
        */

        const rawChapters =
            this.getChapters();


        /*
        --------------------------------------------
        NORMALISASI BAB
        --------------------------------------------
        */

        const chapters =
            rawChapters.map(

                (
                    chapter,
                    index
                ) => {

                    return this.normalizeChapter(
                        chapter,
                        index
                    );

                }

            );


        /*
        --------------------------------------------
        TOTAL
        --------------------------------------------
        */

        const totalChapters =
            chapters.length;


        const totalWords =
            this.getTotalWords(
                chapters
            );


        /*
        --------------------------------------------
        TOC
        --------------------------------------------
        */

        const toc =
            this.buildTOC(
                chapters
            );


        /*
        --------------------------------------------
        MANUSCRIPT
        --------------------------------------------
        */

        const manuscript = {

            /*
            ==============================
            INFORMASI BUKU
            ==============================
            */

            book: {

                ...book

            },


            /*
            ==============================
            TABLE OF CONTENTS
            ==============================
            */

            toc:


                toc,


            /*
            ==============================
            BAB
            ==============================
            */

            chapters:


                chapters,


            /*
            ==============================
            STATISTIK
            ==============================
            */

            totalChapters:


                totalChapters,


            totalWords:


                totalWords,


            /*
            ==============================
            WAKTU
            ==============================
            */

            generatedAt:


                new Date().toISOString()

        };


        this.log(
            "Manuscript built with automatic TOC."
        );


        return manuscript;

    }


    /*
    ====================================================
    PREVIEW
    ====================================================
    */

    async preview() {

        const manuscript =
            await this.build();


        this.log(
            "Preview generated."
        );


        return manuscript;

    }


    /*
    ====================================================
    PUBLISH
    ====================================================
    */

    async publish() {

        const manuscript =
            await this.build();


        this.log(
            "Publishing entire manuscript..."
        );


        return {

            success: true,

            message:
                "Publish seluruh naskah berhasil.",

            document:
                manuscript

        };

    }

}


export default new PublishService();
