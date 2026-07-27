export function renderHeader(target){


fetch(
"../../components/Header/header.html"
)

.then(res=>res.text())

.then(html=>{


document.querySelector(target)

.innerHTML=html;


});


}
