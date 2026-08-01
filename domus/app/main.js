/*
====================================================
DOMUS Entry Point (Debug Mode)
====================================================
*/

const app = document.querySelector("#app");

function debug(message) {
    console.log(message);
    app.innerHTML += `<div style="padding:6px;font-family:monospace;">${message}</div>`;
}

debug("1. main.js dimulai");

try {

    debug("2. Mengimpor Bootstrap...");

    const module = await import("./core/Bootstrap.js");

    debug("3. Bootstrap berhasil diimpor");

    await module.default();

    debug("4. Bootstrap selesai");

} catch (error) {

    debug("❌ ERROR:");

    debug(error.message);

    console.error(error);

}
