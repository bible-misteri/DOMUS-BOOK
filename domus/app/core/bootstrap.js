/*
=================================
DOMUS BOOTSTRAP
=================================
*/


import {

initializeState

}

from "./state.js";



import {

getCurrentUser

}

from "../services/users.js";



import {

getActiveBook

}

from "../services/books.js";



import {

setState

}

from "./state.js";





async function startDOMUS(){



console.log(

"Starting DOMUS Framework..."

);



initializeState();



const user =

await getCurrentUser();



setState(

"user",

user

);



const book =

await getActiveBook();



setState(

"activeBook",

book

);



console.log(

"DOMUS Ready"

);



loadHome();



}





function loadHome(){



window.location.href =

"app/pages/home/home.html";



}



startDOMUS();
