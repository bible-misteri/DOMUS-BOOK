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

    /*
    ====================================================
    INITIALIZE
    ====================================================
    */

    async initialize() {

        this.log("PublishService initialized.");

    }

    /*
    ====================================================
    GET ACTIVE BOOK
    ====================================================
    */

    getBook() {

        return Store.get("activeBook");

    }

    /*
    ====================================================
    GET ALL CHAPTERS
    ====================================================
    */

    getChapters() {

        const chapters =
            Store.get("chapters");

        if (!Array.isArray(chapters)) {

            return [];

        }

        return chapters;

    }

    /*
    ====================================================
    GET ACTIVE CHAPTER
    ====================================================
    */

    getChapter() {

        return Store.get("activeChapter");

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
    HITUNG TOTAL KATA SELURUH BUKU
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
    BUILD DOKUMEN LENGKAP
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
        Ambil SELURUH BAB
        --------------------------------------------
        */

        const chapters =
            this.getChapters();

        if (chapters.length === 0) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }

        /*
        --------------------------------------------
        Hitung total kata
        --------------------------------------------
        */

        const totalWords =
            this.getTotalWords(
                chapters
            );

        /*
        --------------------------------------------
        Susun dokumen
        --------------------------------------------
        */

        const document = {

            book: {

                id: book.id,

                title: book.title

            },

            chapters: chapters.map(
                (chapter, index) => {

                    return {

                        id: chapter.id,

                        number: index + 1,

                        title: chapter.title,

                        content:
                            chapter.content || "",

                        wordCount:
                            this.countWords(
                                chapter.content || ""
                            )

                    };

                }
            ),

            totalChapters:
                chapters.length,

            totalWords:
                totalWords,

            generatedAt:
                new Date().toISOString()

        };

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
            "Full manuscript preview generated."
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
            "Full manuscript publishing..."
        );

        return {

            success: true,

            message:
                "Publish seluruh naskah berhasil.",

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
