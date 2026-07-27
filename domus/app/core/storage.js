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

/*
====================================================
DOMUS Framework v1.0
Storage Engine
====================================================
*/

class Storage {

    constructor(prefix = "DOMUS") {

        this.prefix = prefix;

    }


    key(name){

        return `${this.prefix}_${name}`;

    }


    save(name, data){

        try {

            localStorage.setItem(

                this.key(name),

                JSON.stringify(data)

            );

        }

        catch(error){

            console.error(

                "DOMUS Storage Error:",

                error

            );

        }

    }



    load(name, fallback = null){

        try {

            const data =
                localStorage.getItem(
                    this.key(name)
                );


            if(!data){

                return fallback;

            }


            return JSON.parse(data);

        }

        catch(error){

            console.error(

                "DOMUS Load Error:",

                error

            );

            return fallback;

        }

    }



    remove(name){

        localStorage.removeItem(

            this.key(name)

        );

    }



    clear(){

        Object.keys(localStorage)

        .filter(key =>

            key.startsWith(
                this.prefix
            )

        )

        .forEach(key =>

            localStorage.removeItem(key)

        );

    }

}


export default new Storage();
