/*
====================================================
DOMUS Entry Point
====================================================
*/

import Bootstrap from "./core/Bootstrap.js";

console.log("DOMUS main.js dimulai");

Bootstrap()
    .then(() => {

        console.log("DOMUS berhasil dijalankan");

    })
    .catch(error => {

        console.error(
            "DOMUS gagal dijalankan:",
            error
        );

        const app = document.querySelector("#app");

        if (app) {

            app.innerHTML = `
                <section style="
                    padding:40px;
                    font-family:monospace;
                ">

                    <h1>DOMUS ERROR</h1>

                    <pre>${error.stack || error}</pre>

                </section>
            `;

        }

    });
