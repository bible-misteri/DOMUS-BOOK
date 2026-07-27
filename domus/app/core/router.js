const routes={

home:
"app/pages/home/home.html",

books:
"app/pages/books/books.html",

editor:
"app/pages/editor/editor.html",

review:
"app/pages/review/review.html",

preview:
"app/pages/preview/preview.html",

publish:
"app/pages/publish/publish.html"

};


function navigate(page){

window.location.href =
"../../../"+routes[page];

}


export default navigate;
