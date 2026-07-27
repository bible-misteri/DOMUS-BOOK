/*
=================================
DOMUS STORAGE ENGINE
=================================
*/


import DOMUS_CONFIG from "../config/config.js";



function save(key,data){


localStorage.setItem(

key,

JSON.stringify(data)

);


}



function load(key){


const data =
localStorage.getItem(key);



if(!data){

return null;

}



return JSON.parse(data);



}



function remove(key){


localStorage.removeItem(key);


}



function clear(){


localStorage.clear();


}



export {


save,

load,

remove,

clear


};
