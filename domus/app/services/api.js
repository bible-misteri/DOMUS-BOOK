const API = {

baseURL:"https://...apps-script-url...",

async get(path){

...

},

async post(path,data){

...

}

};

const API_CONFIG={

mode:"local",

endpoint:""

};



async function get(path){

if(API_CONFIG.mode==="local"){

return localData(path);

}


const response =
await fetch(
API_CONFIG.endpoint+path
);


return response.json();

}



async function localData(path){


return {};

}



export {
get
};
