/*
====================================================
DOMUS Framework v1.0
Publish Service
Manuscript Engine v1.0
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
    GET ACTIVE BOOK
    ====================================================
    */

    getBook() {

        const book =
            BookService.getActive()
            || Store.get("activeBook");

        return book || null;

    }


    /*
    ====================================================
    GET ALL CHAPTERS
    ====================================================
    */

    getChapters() {

        const chapters =
            ChapterService.getAll();

        if (!Array.isArray(chapters)) {

            return [];

        }

        /*
        Jangan biarkan item undefined
        masuk ke manuscript.
        */

        return chapters.filter(
            chapter => !!chapter
        );

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
    ESCAPE HTML
    ====================================================
    */

    escapeHtml(text = "") {

        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /*
    ====================================================
    NORMALISASI TEKS
    ====================================================
    */

    normalizeText(text = "") {

        return String(text || "")
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .trim();

    }


    /*
    ====================================================
    PECAH PARAGRAF
    ====================================================
    */

    getParagraphs(text = "") {

        const normalized =
            this.normalizeText(text);

        if (!normalized) {

            return [];

        }

        return normalized
            .split(/\n\s*\n/)
            .map(
                paragraph =>
                    paragraph.trim()
            )
            .filter(Boolean);

    }


    /*
    ====================================================
    PARAGRAF → HTML
    ====================================================
    */

    paragraphToHtml(paragraph = "") {

        const escaped =
            this.escapeHtml(paragraph);

        return `<p>${escaped.replace(
            /\n/g,
            "<br>"
        )}</p>`;

    }


    /*
    ====================================================
    TEXT → HTML
    ====================================================
    */

    textToHtml(text = "") {

        const paragraphs =
            this.getParagraphs(text);

        if (!paragraphs.length) {

            return "";

        }

        return paragraphs
            .map(
                paragraph =>
                    this.paragraphToHtml(
                        paragraph
                    )
            )
            .join("\n");

    }


    /*
    ====================================================
    BUILD CHAPTER
    ====================================================
    */

    buildChapter(
        chapter,
        index
    ) {

        /*
        --------------------------------------------
        PROTEKSI DATA
        --------------------------------------------
        */

        const safeChapter =
            chapter || {};


        const title =
            safeChapter.title
            || `Bab ${index + 1}`;


        const content =
            this.normalizeText(
                safeChapter.content || ""
            );


        const paragraphs =
            this.getParagraphs(
                content
            );


        const html =
            this.textToHtml(
                content
            );


        return {

            /*
            --------------------------------------------
            IDENTITAS
            --------------------------------------------
            */

            id:
                safeChapter.id
                || `chapter-${index + 1}`,

            number:
                index + 1,

            title:
                title,


            /*
            --------------------------------------------
            ISI ASLI
            --------------------------------------------
            */

            content:
                content,


            /*
            --------------------------------------------
            PARAGRAF
            --------------------------------------------
            */

            paragraphs:
                paragraphs.map(
                    (
                        paragraph,
                        paragraphIndex
                    ) => {

                        return {

                            number:
                                paragraphIndex + 1,

                            text:
                                paragraph,

                            html:
                                this.paragraphToHtml(
                                    paragraph
                                )

                        };

                    }
                ),


            /*
            --------------------------------------------
            HTML
            --------------------------------------------
            */

            html:
                html,


            /*
            --------------------------------------------
            STATISTIK
            --------------------------------------------
            */

            wordCount:
                this.countWords(
                    content
                )

        };

    }


    /*
    ====================================================
    FRONT MATTER
    ====================================================
    */

    buildFrontMatter(book) {

        const safeBook =
            book || {};

        return {

            titlePage: {

                enabled:
                    true,

                title:
                    safeBook.title
                    || "Tanpa Judul"

            },

            tableOfContents: {

                enabled:
                    true

            }

        };

    }


    /*
    ====================================================
    BACK MATTER
    ====================================================
    */

    buildBackMatter() {

        return {

            enabled:
                false,

            sections:
                []

        };

    }


    /*
    ====================================================
    METADATA
    ====================================================
    */

    buildMetadata(book) {

        const safeBook =
            book || {};

        return {

            title:
                safeBook.title
                || "Tanpa Judul",

            author:
                safeBook.author
                || "",

            language:
                safeBook.language
                || "id-ID",

            publisher:
                safeBook.publisher
                || "DOMUS Publisher",

            createdAt:
                safeBook.createdAt
                || null,

            updatedAt:
                safeBook.updatedAt
                || null

        };

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

        const sourceChapters =
            this.getChapters();


        if (
            !sourceChapters ||
            sourceChapters.length === 0
        ) {

            throw new Error(
                "Buku belum memiliki bab."
            );

        }


        /*
        --------------------------------------------
        BUILD SEMUA BAB
        --------------------------------------------
        */

        const chapters =
            sourceChapters.map(
                (chapter, index) => {

                    return this.buildChapter(
                        chapter,
                        index
                    );

                }
            );


        /*
        --------------------------------------------
        TOTAL KATA
        --------------------------------------------
        */

        const totalWords =
            chapters.reduce(

                (
                    total,
                    chapter
                ) => {

                    return total +
                        (
                            Number(
                                chapter.wordCount
                            )
                            || 0
                        );

                },

                0

            );


        /*
        --------------------------------------------
        WAKTU
        --------------------------------------------
        */

        const generatedAt =
            new Date().toISOString();


        /*
        ====================================================
        MANUSCRIPT
        ====================================================
        */

        const manuscript = {

            type:
                "domus-manuscript",

            schema:
                "DOMUS-MS-1.0",

            version:
                "1.0",

       /*
       ====================================================
       KOMPATIBILITAS DENGAN PUBLISH PAGE LAMA
       ====================================================
       */

            book:
                book,

            chapter:
                chapters.length > 0
                    ? chapters[0]
                    : null,


            generatedAt:
                generatedAt,


            metadata:
                this.buildMetadata(
                    book
                ),


            frontMatter:
                this.buildFrontMatter(
                    book
                ),


            chapters:
                chapters,


            backMatter:
                this.buildBackMatter(),


            statistics: {

                totalChapters:
                    chapters.length,

                totalWords:
                    totalWords

            },


            export: {

                pdf: {

                    ready:
                        true

                },

                epub: {

                    ready:
                        true

                }

            }

        };


        /*
        --------------------------------------------
        SIMPAN HASIL TERAKHIR
        --------------------------------------------
        */

        Store.set(
            "publishedDocument",
            manuscript
        );


        this.log(
            "DOMUS Manuscript built successfully."
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
            "Manuscript preview generated."
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


/*
====================================================
EXPORT
====================================================
*/

export default new PublishService();
