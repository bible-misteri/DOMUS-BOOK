import {

navigate

}

from "../../core/router.js";



export function renderSidebar(target){


fetch(
"../../components/Sidebar/sidebar.html"
)


.then(res=>res.text())

.then(html=>{


document.querySelector(target)

.innerHTML=html;



activateMenu();


});


}



function activateMenu(){


document

.querySelectorAll(
".sidebar button"
)

.forEach(btn=>{


btn.onclick=function(){


navigate(
this.dataset.page
);


}


});


}
