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
        ChapterService.getAll();

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
    NORMALISASI BAB
    ====================================================
    
    Setiap bab yang masuk manuscript akan memiliki:

    number
    id
    title
    content
    wordCount
    */

    normalizeChapter(
        chapter,
        index
    ) {

        const content =
            String(
                chapter?.content || ""
            );

        const title =
            String(
                chapter?.title ||
                `Bab ${index + 1}`
            );

        return {

            number:
                index + 1,

            id:
                chapter?.id ||
                `chapter-${index + 1}`,

            title:
                title,

            content:
                content,

            wordCount:
                this.countWords(
                    content
                )

        };

    }


    /*
    ====================================================
    BANGUN DAFTAR ISI / TOC
    ====================================================
    */

    buildTOC(chapters) {

        return chapters.map(
            (chapter) => {

                return {

                    number:
                        chapter.number,

                    title:
                        chapter.title,

                    id:
                        chapter.id

                };

            }
        );

    }


    /*
    ====================================================
    TOTAL KATA
    ====================================================
    */

    getTotalWords(chapters) {

        return chapters.reduce(

            (
                total,
                chapter
            ) => {

                return total +
                    (
                        chapter.wordCount ||
                        0
                    );

            },

            0

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
        BAB MENTAH
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
            ========================================
            INFORMASI DOKUMEN
            ========================================
            */

            type:
                "manuscript",

            version:
                "1.0",


            /*
            ========================================
            METADATA BUKU
            ========================================
            */

            book: {

                id:
                    book?.id || null,

                title:
                    book?.title || "",

                author:
                    book?.author || "",

                subtitle:
                    book?.subtitle || ""

            },


            /*
            ========================================
            FRONT MATTER
            ========================================
            */

            frontMatter: {

                title:
                    book?.title || "",

                author:
                    book?.author || ""

            },


            /*
            ========================================
            DAFTAR ISI
            ========================================
            */

            toc:
                toc,


            /*
            ========================================
            ISI UTAMA
            ========================================
            */

            chapters:
                chapters,


            /*
            ========================================
            STATISTIK
            ========================================
            */

            totalChapters:
                totalChapters,

            totalWords:
                totalWords,


            /*
            ========================================
            WAKTU PEMBENTUKAN
            ========================================
            */

            generatedAt:
                new Date().toISOString()

        };


        /*
        --------------------------------------------
        LOG
        --------------------------------------------
        */

        this.log(
            "Manuscript built with TOC."
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

            success:
                true,

            message:
                "Publish seluruh naskah berhasil.",

            document:
                manuscript

        };

    }

}


export default new PublishService();
