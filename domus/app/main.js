/*
====================================================
DOMUS Entry Point
====================================================
*/

import Bootstrap from "./core/Bootstrap.js";

Bootstrap().catch(error => {

    console.error("DOMUS gagal dijalankan:");

    console.error(error);

});
