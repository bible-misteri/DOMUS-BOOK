/*
======================================
DOMUS HOME
Version 1.0
======================================
*/

const homeData={

user:{
    name:"Norman"
},

activeBook:{

    title:"DOMUS ISAACI",

    subtitle:"Membaca Kembali Kisah Yakub dan Esau",

    cover:"../../assets/covers/domus-isaaci-cover.jpg",

    status:"Writing",

    progress:"37%",

    chapter:"Bab 7"

}

};



function loadHome(){

    document.getElementById("userName").innerHTML=
    "Selamat Datang, "+homeData.user.name;

    document.getElementById("bookTitle").innerHTML=
    homeData.activeBook.title;

    document.getElementById("bookSubtitle").innerHTML=
    homeData.activeBook.subtitle;

    document.getElementById("bookStatus").innerHTML=
    homeData.activeBook.status;

    document.getElementById("bookProgress").innerHTML=
    homeData.activeBook.progress;

    document.getElementById("bookChapter").innerHTML=
    homeData.activeBook.chapter;

    document.getElementById("bookCover").src=
    homeData.activeBook.cover;

}



document
.getElementById("continueBtn")
.addEventListener("click",function(){

    alert("Membuka Editor...");

    // window.location="../editor/editor.html";

});


window.onload=loadHome;
