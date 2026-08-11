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

        this.log("PublishService initialized.");

    }

    /*
    ====================================================
    BUKU AKTIF
    ====================================================
    */

    getBook() {

        return Store.get("activeBook");

    }

    /*
    ====================================================
    SELURUH BAB
    ====================================================
    */

    getChapters() {

        const chapters =
            Store.get("chapters");

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
    TOTAL KATA
    ====================================================
    */

    getTotalWords(chapters) {

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

        const chapters =
            this.getChapters();

        const totalChapters =
            chapters.length;

        const totalWords =
            this.getTotalWords(
                chapters
            );

        /*
        --------------------------------------------
        STRUKTUR MANUSCRIPT
        --------------------------------------------
        */

        const manuscript = {

            book: book,

            chapters: chapters,

            totalChapters:
                totalChapters,

            totalWords:
                totalWords,

            generatedAt:
                new Date().toISOString()

        };

        this.log(
            "Manuscript built."
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
