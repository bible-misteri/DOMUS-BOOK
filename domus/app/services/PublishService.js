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
    PECAH MENJADI PARAGRAF
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

        const title =
            chapter.title ||
            `Bab ${index + 1}`;

        const content =
            this.normalizeText(
                chapter.content || ""
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
                chapter.id,

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
            STRUKTUR PARAGRAF
            --------------------------------------------
            */

            paragraphs:
                paragraphs.map(
                    (paragraph, paragraphIndex) => {

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
            HTML CHAPTER
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
    BUILD FRONT MATTER
    ====================================================
    */

    buildFrontMatter(book) {

        return {

            titlePage: {

                enabled: true,

                title:
                    book.title ||
                    "Tanpa Judul"

            },

            tableOfContents: {

                enabled: true

            }

        };

    }


    /*
    ====================================================
    BUILD BACK MATTER
    ====================================================
    */

    buildBackMatter() {

        return {

            enabled: false,

            sections: []

        };

    }


    /*
    ====================================================
    BUILD METADATA
    ====================================================
    */

    buildMetadata(book) {

        return {

            title:
                book.title ||
                "Tanpa Judul",

            author:
                book.author ||
                "",

            language:
                book.language ||
                "id-ID",

            publisher:
                book.publisher ||
                "DOMUS Publisher",

            createdAt:
                book.createdAt ||
                null,

            updatedAt:
                book.updatedAt ||
                null

        };

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
        AMBIL SEMUA BAB
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
        BUILD CHAPTERS
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
        TOTAL KATA
        --------------------------------------------
        */

        const totalWords =
            chapters.reduce(

                (total, chapter) => {

                    return total +
                        chapter.wordCount;

                },

                0

            );


        /*
        --------------------------------------------
        GENERATED AT
        --------------------------------------------
        */

        const generatedAt =
            new Date().toISOString();


        /*
        ====================================================
        MANUSCRIPT OBJECT
        ====================================================
        */

        const manuscript = {

            /*
            --------------------------------------------
            IDENTITAS FORMAT
            --------------------------------------------
            */

            type:
                "domus-manuscript",

            schema:
                "DOMUS-MS-1.0",

            version:
                "1.0",


            /*
            --------------------------------------------
            WAKTU
            --------------------------------------------
            */

            generatedAt:
                generatedAt,


            /*
            --------------------------------------------
            METADATA
            --------------------------------------------
            */

            metadata:
                this.buildMetadata(
                    book
                ),


            /*
            --------------------------------------------
            FRONT MATTER
            --------------------------------------------
            */

            frontMatter:
                this.buildFrontMatter(
                    book
                ),


            /*
            --------------------------------------------
            CHAPTERS
            --------------------------------------------
            */

            chapters:
                chapters,


            /*
            --------------------------------------------
            BACK MATTER
            --------------------------------------------
            */

            backMatter:
                this.buildBackMatter(),


            /*
            --------------------------------------------
            STATISTIK
            --------------------------------------------
            */

            statistics: {

                totalChapters:
                    chapters.length,

                totalWords:
                    totalWords

            },


            /*
            --------------------------------------------
            EXPORT TARGET
            --------------------------------------------
            */

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
        ====================================================
        SIMPAN DOCUMENT TERAKHIR
        ====================================================
        */

        Store.set(
            "publishedDocument",
            manuscript
        );


        /*
        ====================================================
        LOG
        ====================================================
        */

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
EXPORT SINGLETON
====================================================
*/

export default new PublishService();
