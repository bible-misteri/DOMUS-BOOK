export function renderBookCard(target,book){



fetch(

"../../components/BookCard/book-card.html"

)


.then(res=>res.text())

.then(html=>{


document.querySelector(target)

.innerHTML=html;



document

.getElementById("card-cover")

.src=

book.cover;



document

.getElementById("card-title")

.innerHTML=

book.title;



document

.getElementById("card-subtitle")

.innerHTML=

book.subtitle;



document

.getElementById("card-progress")

.innerHTML=

book.progress+"%";



});



}
