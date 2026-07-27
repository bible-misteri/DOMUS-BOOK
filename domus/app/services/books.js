export async function getActiveBook(){

return{

title:"DOMUS ISAACI",

status:"Writing",

progress:37

};

}

import {get} from "./api.js";


async function getBooks(){

return [

{
id:"DOMUS001",

title:
"DOMUS ISAACI",

subtitle:
"Membaca Kembali Kisah Yakub dan Esau",

cover:
"assets/covers/domus-isaaci-cover.jpg",

progress:37,

status:"Writing"

}

];

}



async function getActiveBook(){

const books =
await getBooks();


return books[0];

}



export {

getBooks,

getActiveBook

};
