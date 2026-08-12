/*
====================================================
DOMUS Framework v1.0
Publish Service
Manuscript Structure v1.1
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

                    wordCount,

                    type:
                        "chapter"

                };

            }

        );

    }


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


    /*
    ====================================================
    FRONT MATTER
    ====================================================
    */

    buildFrontMatter(book) {

        return {

            type:
                "front-matter",

            items: [

                {
                    type: "cover",
                    title: "Cover"
                },

                {
                    type: "title-page",
                    title: "Halaman Judul"
                },

                {
                    type: "copyright",
                    title: "Copyright"
                },

                {
                    type: "dedication",
                    title: "Dedikasi"
                },

                {
                    type: "introduction",
                    title: "Pendahuluan"
                },

                {
                    type: "toc",
                    title: "Daftar Isi"
                }

            ]

        };

    }


    /*
    ====================================================
    MAIN MATTER
    ====================================================
    */

    buildMainMatter(chapters = []) {

        return {

            type:
                "main-matter",

            chapters:
                chapters

        };

    }


    /*
    ====================================================
    BACK MATTER
    ====================================================
    */

    buildBackMatter() {

        return {

            type:
                "back-matter",

            items: [

                {
                    type: "notes",
                    title: "Catatan"
                },

                {
                    type: "bibliography",
                    title: "Daftar Pustaka"
                },

                {
                    type: "author",
                    title: "Tentang Penulis"
                }

            ]

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
        AMBIL BAB
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
        TOC
        --------------------------------------------
        */

        const toc =
            this.buildTOC(
                chapters
            );


        /*
        --------------------------------------------
        FRONT MATTER
        --------------------------------------------
        */

        const frontMatter =
            this.buildFrontMatter(
                book
            );


        /*
        --------------------------------------------
        MAIN MATTER
        --------------------------------------------
        */

        const mainMatter =
            this.buildMainMatter(
                chapters
            );


        /*
        --------------------------------------------
        BACK MATTER
        --------------------------------------------
        */

        const backMatter =
            this.buildBackMatter();


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
        ====================================================
        MANUSCRIPT FINAL
        ====================================================
        */

        const manuscript = {

            version:
                "1.1",

            type:
                "book-manuscript",

            book: {

                ...book,

                chapters:
                    chapters

            },


            structure: {

                frontMatter:
                    frontMatter,

                mainMatter:
                    mainMatter,

                backMatter:
                    backMatter

            },


            toc:
                toc,


            chapters:
                chapters,


            totalChapters:
                totalChapters,


            totalWords:
                totalWords,


            generatedAt:
                new Date().toISOString()

        };


        this.log(

            `Manuscript v${manuscript.version} built: ` +

            `${totalChapters} chapters, ` +

            `${totalWords} words.`

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

            `Publishing manuscript v${manuscript.version}: ` +

            `${manuscript.totalChapters} chapters.`

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
