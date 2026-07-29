/*
====================================================
DOMUS Framework v1.0
Reactive Store
====================================================
*/


import Storage from "./Storage.js";

import EventBus from "./EventBus.js";



class Store {


    constructor(){

        this.state={

            user:null,


            activeBook:null,


            activeChapter:null,


            settings:{

                theme:"light"

            }

        };


    }



    initialize(){

        const saved =

            Storage.load(
                "state"
            );


        if(saved){

            this.state = {

                ...this.state,

                ...saved

            };

        }

    }



    get(key){

        return this.state[key];

    }



    getAll(){

        return this.state;

    }



    set(key,value){


        this.state[key]=value;


        Storage.save(

            "state",

            this.state

        );


        EventBus.emit(

            "state.changed",

            {

                key,

                value

            }

        );


    }



    update(object){


        Object.keys(object)

        .forEach(key => {

            this.state[key]=object[key];

        });



        Storage.save(

            "state",

            this.state

        );



        EventBus.emit(

            "state.updated",

            this.state

        );


    }



    reset(){


        this.state = {

        user: null,

        books: [],

        activeBook: null,

        activeChapter: null,

        settings: {

            theme: "light"

        }

    };


        Storage.remove("state");


        EventBus.emit(

            "state.reset"

        );


    }


}


export default new Store();
