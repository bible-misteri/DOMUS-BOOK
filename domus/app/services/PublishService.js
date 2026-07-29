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

    getBook() {

        return Store.get("activeBook");

    }

    getChapter() {

        return Store.get("activeChapter");

    }

    async build() {

        const book = this.getBook();

        const chapter = this.getChapter();

        if (!book) {

            throw new Error("Tidak ada buku aktif.");

        }

        return {

            book,

            chapter,

            generatedAt: new Date().toISOString()

        };

    }

    async preview() {

        const document = await this.build();

        this.log("Preview generated.");

        return document;

    }

    async publish() {

        const document = await this.build();

        this.log("Publishing...");

        return {

            success: true,

            message: "Publish berhasil.",

            document

        };

    }

}

export default new PublishService();
