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
    GET ACTIVE BOOK
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
    TOTAL KATA SELURUH BUKU
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
    BUILD FULL MANUSCRIPT
    ====================================================
    */

    async build() {

        /*
        --------------------------------------------
        AMBIL BUKU AKTIF
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
        AMBIL SELURUH BAB
        --------------------------------------------
        */

        const chapters =
            this.getChapters();


        if (!chapters ||
            chapters.length === 0) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }


        /*
        --------------------------------------------
        HITUNG TOTAL KATA
        --------------------------------------------
        */

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
        ============================================
        SUSUN SELURUH BAB
        ============================================
        */

        const manuscriptChapters =
            chapters.map(
                (chapter, index) => {

                    return {

                        id:
                            chapter.id,

                        number:
                            index + 1,

                        title:
                            chapter.title,

                        content:
                            chapter.content || "",

                        wordCount:
                            this.countWords(
                                chapter.content || ""
                            )

                    };

                }
            );


        /*
        ============================================
        BANGUN DOCUMENT
        ============================================
        */

        const document = {

            /*
            ----------------------------------------
            INFORMASI BUKU
            ----------------------------------------
            */

            book: {

                id:
                    book.id,

                title:
                    book.title

            },


            /*
            ----------------------------------------
            SELURUH BAB
            ----------------------------------------
            */

            chapters:
                manuscriptChapters,


            /*
            ----------------------------------------
            STATISTIK
            ----------------------------------------
            */

            totalChapters:
                manuscriptChapters.length,

            totalWords:
                totalWords,


            /*
            ----------------------------------------
            WAKTU GENERATE
            ----------------------------------------
            */

            generatedAt:
                new Date().toISOString()

        };


        this.log(
            "DOMUS full manuscript built."
        );


        return document;

    }


    /*
    ====================================================
    PREVIEW DOCUMENT
    ====================================================
    */

    async preview() {

        const document =
            await this.build();


        this.log(
            "DOMUS manuscript preview generated."
        );


        return document;

    }


    /*
    ====================================================
    PUBLISH DOCUMENT
    ====================================================
    */

    async publish() {

        const document =
            await this.build();


        this.log(
            "DOMUS full manuscript publishing..."
        );


        /*
        --------------------------------------------
        UNTUK SAAT INI PUBLISH MASIH LOCAL
        --------------------------------------------

        Tahap berikutnya dapat mengubah document
        ini menjadi:

        - HTML
        - Markdown
        - DOCX
        - PDF
        - EPUB

        --------------------------------------------
        */


        return {

            success:
                true,

            message:
                "Publish seluruh naskah berhasil.",

            document:
                document

        };

    }

}


/*
====================================================
EXPORT
====================================================
*/

export default new PublishService();
