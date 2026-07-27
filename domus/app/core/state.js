const DOMUS_STATE = {

user:null,

book:null,

chapter:null,

settings:{
    theme:"light"
}

};


function setState(key,value){

DOMUS_STATE[key]=value;

saveState();

}


function getState(key){

return DOMUS_STATE[key];

}


function saveState(){

localStorage.setItem(
"DOMUS_STATE",
JSON.stringify(DOMUS_STATE)
);

}


function loadState(){

const saved =
localStorage.getItem("DOMUS_STATE");

if(saved){

Object.assign(
DOMUS_STATE,
JSON.parse(saved)
);

}

}


export {
DOMUS_STATE,
setState,
getState,
loadState
};

/*
=================================
DOMUS GLOBAL STATE
=================================
*/


import {

save,

load

}

from "./storage.js";



import DOMUS_CONFIG from "../config/config.js";



let STATE = {


user:null,


activeBook:null,


activeChapter:null,



settings:


{

theme:
"light"

}


};



function initializeState(){


const saved =

load(

DOMUS_CONFIG.storageKey

);



if(saved){


STATE=saved;


}


}



function setState(key,value){


STATE[key]=value;



save(

DOMUS_CONFIG.storageKey,

STATE

);



}



function getState(key){


return STATE[key];


}



function getAllState(){


return STATE;


}



export {


STATE,

initializeState,

setState,

getState,

getAllState


};
