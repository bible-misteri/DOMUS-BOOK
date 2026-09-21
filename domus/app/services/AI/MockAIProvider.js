/*
====================================================
DOMUS Framework v1.0
Mock AI Provider
====================================================
*/

export default class MockAIProvider {

    async ask(prompt, context = {}) {

        const text =
            context.text ||
            context.chapterContent ||
            "";

        if (!text.trim()) {

            return "Belum ada teks yang dapat dianalisis.";

        }


        /*
        ====================================================
        SIMULASI PERBAIKI BAHASA
        ====================================================
        */

        if (
            prompt.includes(
                "Perbaiki bahasa"
            )
        ) {

            return `
DOMUS AI — SIMULASI

Teks telah diterima oleh sistem.

Pada tahap berikutnya, AI akan:
• memperbaiki tata bahasa;
• memperbaiki struktur kalimat;
• menjaga makna asli tulisan;
• mempertahankan gaya penulis.

Teks sumber:

${text}
`;

        }


        /*
        ====================================================
        SIMULASI KEMBANGKAN
        ====================================================
        */

        if (
            prompt.includes(
                "Kembangkan tulisan"
            )
        ) {

            return `
DOMUS AI — SIMULASI

Tulisan dapat dikembangkan dengan:

• memperjelas gagasan utama;
• menambahkan penjelasan;
• memperkuat hubungan antarparagraf;
• menjaga arah pemikiran penulis.

Teks sumber:

${text}
`;

        }


        /*
        ====================================================
        SIMULASI RINGKAS
        ====================================================
        */

        if (
            prompt.includes(
                "Ringkas tulisan"
            )
        ) {

            const words =
                text
                    .trim()
                    .split(/\s+/);

            const summary =
                words
                    .slice(0, 50)
                    .join(" ");

            return `
DOMUS AI — SIMULASI RINGKASAN

${summary}${words.length > 50 ? "..." : ""}
`;

        }


        /*
        ====================================================
        SIMULASI ANALISIS
        ====================================================
        */

        if (
            prompt.includes(
                "Analisis struktur"
            )
        ) {

            const words =
                text
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);

            const paragraphs =
                text
                    .split(/\n\s*\n/)
                    .filter(
                        paragraph =>
                            paragraph.trim()
                    );

            return `
DOMUS AI — SIMULASI ANALISIS

Jumlah kata:
${words.length}

Jumlah paragraf:
${paragraphs.length}

Analisis berikutnya dapat mencakup:

• struktur argumentasi;
• kesinambungan gagasan;
• kejelasan bahasa;
• hubungan antarparagraf;
• kekuatan dan kelemahan tulisan.

Tulisan siap diproses oleh AI nyata.
`;

        }


        return `
DOMUS AI menerima permintaan:

${prompt}

Teks:
${text}
`;

    }

}
