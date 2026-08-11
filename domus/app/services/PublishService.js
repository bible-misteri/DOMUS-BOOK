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
    AMBIL BUKU AKTIF
    ====================================================
    */

    getBook() {

        return Store.get("activeBook");

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
    BUILD SELURUH NASKAH
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
        AMBIL SEMUA BAB
        --------------------------------------------
        */

        const chapters =
            Array.isArray(book.chapters)
                ? book.chapters
                : [];

        /*
        --------------------------------------------
        HITUNG SETIAP BAB
        --------------------------------------------
        */

        const publishedChapters =
            chapters.map((chapter, index) => {

                const content =
                    chapter.content || "";

                const wordCount =
                    this.countWords(content);

                return {

                    number: index + 1,

                    id: chapter.id,

                    title:
                        chapter.title ||
                        `Bab ${index + 1}`,

                    content,

                    wordCount

                };

            });

        /*
        --------------------------------------------
        TOTAL KATA
        --------------------------------------------
        */

        const totalWords =
            publishedChapters.reduce(

                (total, chapter) => {

                    return total +
                        chapter.wordCount;

                },

                0

            );

        /*
        --------------------------------------------
        DOKUMEN PUBLISH
        --------------------------------------------
        */

        return {

            book: {

                id: book.id,

                title: book.title

            },

            chapters:
                publishedChapters,

            totalChapters:
                publishedChapters.length,

            totalWords,

            generatedAt:
                new Date().toISOString()

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
            "Preview seluruh naskah berhasil."
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
            "Publishing seluruh naskah..."
        );

        return {

            success: true,

            message:
                "Publish seluruh naskah berhasil.",

            document

        };

    }

}

export default new PublishService();
