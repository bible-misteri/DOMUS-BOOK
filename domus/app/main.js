const app = document.querySelector("#app");

function debug(msg) {
    console.log(msg);
    app.innerHTML += `<div>${msg}</div>`;
}

debug("main.js dimulai");

fetch("./core/Bootstrap.js")
    .then(r => {
        debug("Status: " + r.status);
        return r.text();
    })
    .then(text => {
        debug("Panjang file: " + text.length);
        debug(text.substring(0, 200));
    })
    .catch(err => {
        debug(err.toString());
    });
