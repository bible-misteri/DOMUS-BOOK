/*
====================================================
DOMUS Framework v1.0
AI Service
====================================================
*/

class AIService {

    constructor() {

        this.provider = null;

        this.enabled = false;

    }

    configure(provider) {

        this.provider = provider;

        this.enabled = provider !== null;

    }

    isAvailable() {

        return (
            this.enabled &&
            this.provider !== null
        );

    }

    async ask(prompt, context = {}) {

        if (!this.isAvailable()) {

            throw new Error(
                "DOMUS AI belum dikonfigurasi."
            );

        }

        return await this.provider.ask(
            prompt,
            context
        );

    }

    async improve(text, context = {}) {

        return await this.ask(
            "Perbaiki bahasa tulisan berikut tanpa mengubah makna utamanya.",
            {
                ...context,
                text
            }
        );

    }

    async summarize(text, context = {}) {

        return await this.ask(
            "Ringkas tulisan berikut dengan mempertahankan gagasan utamanya.",
            {
                ...context,
                text
            }
        );

    }

    async expand(text, context = {}) {

        return await this.ask(
            "Kembangkan tulisan berikut secara terstruktur tanpa mengubah gagasan dasarnya.",
            {
                ...context,
                text
            }
        );

    }

    async analyze(text, context = {}) {

        return await this.ask(
            "Analisis struktur, kejelasan, dan kesinambungan tulisan berikut.",
            {
                ...context,
                text
            }
        );

    }

}

export default new AIService();
