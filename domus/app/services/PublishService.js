/*
====================================================
DOMUS Framework v1.0
Publish Service
====================================================
*/

import Service from "../core/Service.js";
import BookService from "./BookService.js";

class PublishService extends Service {

    constructor() {

        super("PublishService");

    }


    /*
    ====================================================
    BUKU AKTIF
    ====================================================
    */

    getBook() {

        return BookService.getActive();

    }


    /*
    ====================================================
    SELURUH BAB
    ====================================================
    */

    getChapters() {

        const book =
            this.getBook();

        if (!book) {

            return [];

        }

        if (!Array.isArray(book.chapters)) {

            return [];

        }

        return book.chapters;

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
    TOTAL KATA
    ====================================================
    */

    getTotalWords(chapters = []) {

        return chapters.reduce(

            (total, chapter) => {

                return total +
                    this.countWords(
                        chapter?.content || ""
                    );

            },

            0

        );

    }


    /*
    
    /*
====================================================
BUILD TOC
====================================================
*/

buildTOC(chapters = []) {

    return chapters.map(

        (chapter, index) => {

            return {

                number:
                    index + 1,

                id:
                    chapter.id,

                title:
                    chapter.title ||
                    `Bab ${index + 1}`,

                wordCount:
                    chapter.wordCount || 0

            };

        }

    );

}
    
    ====================================================
    NORMALISASI BAB
    ====================================================
    */

    normalizeChapters(chapters = []) {

        return chapters.map(

            (chapter, index) => {

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

                    number:
                        index + 1,

                    title:
                        chapter?.title ||
                        `Bab ${index + 1}`,

                    content,

                    wordCount

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

        const book =
            this.getBook();

        if (!book) {

            throw new Error(
                "Tidak ada buku aktif."
            );

        }


        /*
        --------------------------------------------
        AMBIL BAB LANGSUNG DARI BUKU AKTIF
        --------------------------------------------
        */

        const rawChapters =
            this.getChapters();


        /*
        --------------------------------------------
        NORMALISASI
        --------------------------------------------
        */

        const chapters =
            this.normalizeChapters(
                rawChapters
            );


        /*
        --------------------------------------------
        HITUNG TOTAL
        --------------------------------------------
        */

        const totalChapters =
            chapters.length;

        const totalWords =
            this.getTotalWords(
                chapters
            );

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

            book: {

                ...book,

                chapters: chapters

            },

            chapters,

            toc,

            totalChapters,

            totalWords,

            generatedAt:
                new Date().toISOString()

        };


        this.log(
            `Manuscript built: ${totalChapters} chapters, ${totalWords} words.`
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
            `Publishing manuscript: ${manuscript.totalChapters} chapters.`
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
