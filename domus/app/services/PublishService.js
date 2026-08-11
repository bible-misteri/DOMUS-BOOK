/*
====================================================
DOMUS Framework v1.0
Publish Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";

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
    GET BOOK
    ====================================================
    */

    getBook() {

        return (
            BookService.getActive()
            || Store.get("activeBook")
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
    HITUNG KATA
    ====================================================
    */

    countWords(text = "") {

        const cleanText =
            String(text || "").trim();

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
    HITUNG TOTAL KATA
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
    BUILD CHAPTER
    ====================================================
    */

    buildChapter(chapter, index) {

        return {

            number: index + 1,

            id: chapter.id,

            title:
                chapter.title || `Bab ${index + 1}`,

            content:
                chapter.content || "",

            wordCount:
                this.countWords(
                    chapter.content || ""
                )

        };

    }


    /*
    ====================================================
    BUILD DOCUMENT
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

        const sourceChapters =
            this.getChapters();


        if (!sourceChapters ||
            sourceChapters.length === 0) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }


        /*
        --------------------------------------------
        BANGUN SEMUA BAB
        --------------------------------------------
        */

        const chapters =
            sourceChapters.map(

                (chapter, index) =>

                    this.buildChapter(
                        chapter,
                        index
                    )

            );


        /*
        --------------------------------------------
        HITUNG TOTAL
        --------------------------------------------
        */

        const totalWords =
            this.getTotalWords(
                chapters
            );


        /*
        --------------------------------------------
        DOCUMENT
        --------------------------------------------
        */

        const document = {

            type:
                "domus-manuscript",

            version:
                "1.0",

            generatedAt:
                new Date().toISOString(),

            book: {

                id:
                    book.id,

                title:
                    book.title || "Tanpa Judul"

            },

            totalChapters:
                chapters.length,

            totalWords:
                totalWords,

            chapters:
                chapters

        };


        /*
        --------------------------------------------
        SIMPAN HASIL TERAKHIR
        --------------------------------------------
        */

        Store.set(
            "publishedDocument",
            document
        );


        this.log(
            "Document built successfully."
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
            "Publishing entire manuscript..."
        );


        /*
        --------------------------------------------
        HASIL PUBLISH
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
EXPORT SINGLETON
====================================================
*/

export default new PublishService();
