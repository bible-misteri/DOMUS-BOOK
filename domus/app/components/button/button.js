export function createButton(
text,
action
){


const btn=

document.createElement(
"button"
);


btn.className=
"domus-button";


btn.innerHTML=text;


btn.onclick=action;


return btn;


}
