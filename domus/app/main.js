/*
====================================================
DOMUS Entry Point (Debug)
====================================================
*/

const app = document.querySelector("#app");

function debug(msg) {
    console.log(msg);
    app.innerHTML += `<div style="padding:6px;font-family:monospace">${msg}</div>`;
}

debug("main.js dimulai");

import("./core/Bootstrap.js")
    .then(async ({ default: Bootstrap }) => {
        debug("Bootstrap berhasil di-load");
        await Bootstrap();
        debug("Bootstrap selesai");
    })
    .catch(async (err) => {
        debug("ERROR:");
        debug(err.message);

        if (err.stack) {
            debug(err.stack.replace(/\n/g, "<br>"));
        }

        console.error(err);
    });
