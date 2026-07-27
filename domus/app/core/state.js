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
