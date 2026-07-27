const Router = {

home(){

location.href="../home/home.html";

},

books(){

location.href="../books/books.html";

},

editor(){

location.href="../editor/editor.html";

},

review(){

location.href="../review/review.html";

},

preview(){

location.href="../preview/preview.html";

},

publish(){

location.href="../publish/publish.html";

}

};

/*
=================================
DOMUS ROUTER
=================================
*/


import DOMUS_CONFIG from "../config/config.js";



function navigate(page){



const route =

DOMUS_CONFIG.routes[page];



if(!route){


console.error(

"Route tidak ditemukan:",

page

);


return;


}



window.location.href =
"/"+route;



}



function currentPage(){


return window.location.pathname;


}



export {


navigate,

currentPage


};
