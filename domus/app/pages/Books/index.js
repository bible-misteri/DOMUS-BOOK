
/*
====================================================
DOMUS Books Page
Create Book + Cover Image
====================================================
*/

import Page from "../../core/Page.js";
import BookService from "../../services/BookService.js";
import Router from "../../core/Router.js";

export default class BooksPage extends Page {

    constructor() {
        super();
        this.books = [];
        this.coverData = "";
    }

    async load() {
        await BookService.initialize();
        this.books = BookService.getAll();
    }

    escapeHTML(value = "") {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    renderContent() {
        return `
<section class="domus-books" style="max-width:1000px;margin:auto;padding:20px">

    <h1>Buku Saya</h1>
    <p>Kelola buku, identitas penulis, dan sampul Anda.</p>

    <button
        id="btnNewBook"
        class="domus-btn domus-btn-primary"
        type="button">
        + Buat Buku Baru
    </button>

    <div
        id="newBookForm"
        style="display:none;margin-top:24px;padding:20px;
        border:1px solid #ddd;border-radius:12px">

        <h2>Buat Buku Baru</h2>

        <form id="bookForm">

            <label for="bookTitle"><strong>Judul Buku *</strong></label>
            <input
                id="bookTitle"
                name="title"
                type="text"
                maxlength="180"
                required
                placeholder="Masukkan judul buku"
                style="display:block;width:100%;box-sizing:border-box;
                padding:12px;margin:8px 0 16px">

            <label for="bookSubtitle"><strong>Subjudul</strong></label>
            <input
                id="bookSubtitle"
                name="subtitle"
                type="text"
                maxlength="240"
                placeholder="Subjudul (opsional)"
                style="display:block;width:100%;box-sizing:border-box;
                padding:12px;margin:8px 0 16px">

            <label for="bookAuthor"><strong>Nama Penulis</strong></label>
            <input
                id="bookAuthor"
                name="author"
                type="text"
                maxlength="120"
                placeholder="Nama penulis"
                style="display:block;width:100%;box-sizing:border-box;
                padding:12px;margin:8px 0 16px">

            <label for="coverInput"><strong>Sampul Depan</strong></label>
            <p style="font-size:14px;color:#666">
                Pilih gambar JPG, PNG, atau WebP. Gambar akan
                diperkecil agar lebih hemat penyimpanan.
            </p>

            <input
                id="coverInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style="display:block;max-width:100%;margin:10px 0">

            <div
                id="coverPreviewBox"
                style="display:none;margin:16px 0">

                <p><strong>Pratinjau Sampul</strong></p>

                <img
                    id="coverPreview"
                    alt="Pratinjau sampul buku"
                    style="display:block;width:180px;max-height:260px;
                    object-fit:contain;border:1px solid #ddd;
                    border-radius:6px">

                <button
                    id="removeCover"
                    type="button"
                    style="margin-top:8px">
                    Hapus Gambar
                </button>
            </div>

            <p id="coverStatus" role="status" style="font-size:14px"></p>

            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px">
                <button
                    id="btnSaveBook"
                    class="domus-btn domus-btn-primary"
                    type="submit">
                    Simpan dan Buka Editor
                </button>

                <button
                    id="btnCancelBook"
                    class="domus-btn"
                    type="button">
                    Batal
                </button>
            </div>

        </form>
    </div>

    <hr style="margin:24px 0">

    <div id="bookList">
        ${this.renderBooks()}
    </div>

</section>
`;
    }

    renderBooks() {
        if (!this.books.length) {
            return `<p>Belum ada buku. Klik "Buat Buku Baru" untuk memulai.</p>`;
        }

        return this.books.map(book => {
            const title = this.escapeHTML(book.title || "Tanpa Judul");
            const subtitle = this.escapeHTML(book.subtitle || "");
            const author = this.escapeHTML(book.author || "");
            const description = this.escapeHTML(book.description || "");
            const cover = typeof book.coverImage === "string"
                && book.coverImage.startsWith("data:image/")
                ? book.coverImage
                : "";

            return `
<div
    class="domus-card domus-book"
    data-id="${this.escapeHTML(book.id)}"
    tabindex="0"
    role="button"
    style="display:flex;gap:16px;align-items:flex-start;
    padding:16px;margin:16px 0;cursor:pointer">

    ${cover ? `
        <img
            src="${cover}"
            alt="Sampul ${title}"
            style="width:90px;height:130px;object-fit:cover;
            border-radius:4px;flex-shrink:0">
    ` : `
        <div
            aria-label="Belum ada sampul"
            style="width:90px;height:130px;flex-shrink:0;
            display:flex;align-items:center;justify-content:center;
            background:#eee;border-radius:4px;text-align:center;
            font-size:12px;color:#666">
            Belum ada sampul
        </div>
    `}

    <div style="min-width:0">
        <h3>${title}</h3>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
        ${author ? `<p>Penulis: ${author}</p>` : ""}
        ${description ? `<p>${description}</p>` : ""}
        <small>Buka buku untuk melanjutkan penulisan.</small>
    </div>
</div>
`;
        }).join("");
    }

    afterRender() {
        const root = this.element;
        const newButton = root.querySelector("#btnNewBook");
        const formPanel = root.querySelector("#newBookForm");
        const form = root.querySelector("#bookForm");
        const titleInput = root.querySelector("#bookTitle");
        const subtitleInput = root.querySelector("#bookSubtitle");
        const authorInput = root.querySelector("#bookAuthor");
        const coverInput = root.querySelector("#coverInput");
        const previewBox = root.querySelector("#coverPreviewBox");
        const preview = root.querySelector("#coverPreview");
        const status = root.querySelector("#coverStatus");
        const saveButton = root.querySelector("#btnSaveBook");

        if (!newButton || !formPanel || !form) return;

        const resetCover = () => {
            this.coverData = "";
            coverInput.value = "";
            preview.removeAttribute("src");
            previewBox.style.display = "none";
            status.textContent = "";
        };

        newButton.onclick = () => {
            formPanel.style.display = "block";
            titleInput.focus();
        };

        root.querySelector("#btnCancelBook").onclick = () => {
            form.reset();
            resetCover();
            formPanel.style.display = "none";
        };

        root.querySelector("#removeCover").onclick = resetCover;

        coverInput.onchange = async () => {
            resetCover();

            const file = coverInput.files?.[0];
            if (!file) return;

            if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                status.textContent = "Pilih gambar JPG, PNG, atau WebP.";
                coverInput.value = "";
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                status.textContent = "Ukuran gambar maksimal 10 MB.";
                coverInput.value = "";
                return;
            }

            status.textContent = "Memproses gambar...";

            try {
                const data = await this.compressCover(file);
                this.coverData = data;
                preview.src = data;
                previewBox.style.display = "block";
                status.textContent = "Sampul siap disimpan.";
            } catch (error) {
                console.error("DOMUS cover error:", error);
                resetCover();
                status.textContent = "Gambar tidak dapat diproses. Coba gambar lain.";
            }
        };

        form.onsubmit = async event => {
            event.preventDefault();

            const title = titleInput.value.trim();
            const subtitle = subtitleInput.value.trim();
            const author = authorInput.value.trim();

            if (!title) {
                titleInput.focus();
                return;
            }

            saveButton.disabled = true;
            saveButton.textContent = "Menyimpan...";

            try {
                const book = {
                    id: crypto.randomUUID(),
                    title,
                    subtitle,
                    author,
                    coverImage: this.coverData || "",
                    description: "",
                    chapters: []
                };

                BookService.add(book);
                BookService.setActive(book);

                await Router.go("editor");
            } catch (error) {
                console.error("DOMUS create book error:", error);
                alert("Buku gagal dibuat. Periksa ruang penyimpanan browser.");
                saveButton.disabled = false;
                saveButton.textContent = "Simpan dan Buka Editor";
            }
        };

        root.querySelectorAll(".domus-book").forEach(card => {
            const openBook = async () => {
                const book = this.books.find(
                    item => item.id === card.dataset.id
                );

                if (!book) return;

                BookService.setActive(book);
                await Router.go("editor");
            };

            card.onclick = openBook;

            card.onkeydown = event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openBook();
                }
            };
        });
    }

    compressCover(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onerror = () => reject(new Error("Gagal membaca gambar"));

            reader.onload = () => {
                const image = new Image();

                image.onerror = () => reject(new Error("File bukan gambar valid"));

                image.onload = () => {
                    const maxWidth = 600;
                    const maxHeight = 900;
                    const scale = Math.min(
                        1,
                        maxWidth / image.width,
                        maxHeight / image.height
                    );

                    const canvas = document.createElement("canvas");
                    canvas.width = Math.max(1, Math.round(image.width * scale));
                    canvas.height = Math.max(1, Math.round(image.height * scale));

                    const context = canvas.getContext("2d");

                    if (!context) {
                        reject(new Error("Canvas tidak tersedia"));
                        return;
                    }

                    context.fillStyle = "#ffffff";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);

                    resolve(canvas.toDataURL("image/jpeg", 0.72));
                };

                image.src = reader.result;
            };

            reader.readAsDataURL(file);
        });
    }
}
 
