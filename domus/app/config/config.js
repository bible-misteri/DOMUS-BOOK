/*
=================================
DOMUS CONFIGURATION
Version 1.0
=================================
*/


const DOMUS_CONFIG = {


appName:
"DOMUS",


version:
"1.0.0",


author:
"Norman Sandhi",


environment:
"development",



storageKey:
"DOMUS_STATE",



api:


{

mode:
"local",


endpoint:
""


},



routes:

{


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


}



};



export default DOMUS_CONFIG;
