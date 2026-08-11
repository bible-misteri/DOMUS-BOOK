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
    SEMUA BAB
    ====================================================
    */

    getChapters() {

        return ChapterService.getAll();

    }

    /*
    ====================================================
    BUILD DOKUMEN
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

        if (!chapters || chapters.length === 0) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }

        /*
        --------------------------------------------
        BENTUK DOKUMEN LENGKAP
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

                        number: index + 1,

                        id: chapter.id,

                        title: chapter.title,

                        content:
                            chapter.content || ""

                    };

                }
            ),

            totalChapters:
                chapters.length,

            generatedAt:
                new Date().toISOString()

        };

        this.log(
            "Full manuscript built."
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
            "Publishing full manuscript..."
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
