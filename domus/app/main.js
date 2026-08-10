/*
====================================================
DOMUS MODULE DIAGNOSTIC
====================================================
*/

const app = document.querySelector("#app");

function debug(msg) {
    console.log(msg);

    if (app) {
        app.innerHTML += `
            <div style="
                padding:6px;
                font-family:monospace;
                white-space:pre-wrap;
            ">
                ${msg}
            </div>
        `;
    }
}

debug("DOMUS MODULE TEST DIMULAI");

const modules = [
    ["Renderer", "./core/Renderer.js"],
    ["Application", "./core/Application.js"],
    ["Router", "./core/Router.js"],
    ["Routes", "./config/routes.js"],
    ["Bootstrap", "./core/Bootstrap.js"]
];

for (const [name, path] of modules) {

    try {

        debug(`TEST: ${name}`);

        await import(`${path}?v=${Date.now()}`);

        debug(`✓ ${name} BERHASIL`);

    } catch (error) {

        debug(`❌ ${name} GAGAL`);
        debug(error.message);

        console.error(
            `DOMUS MODULE ERROR: ${name}`,
            error
        );
    }
}

debug("DOMUS MODULE TEST SELESAI");
