/*
====================================================
DOMUS Framework v1.0
Event Bus
====================================================
*/


class EventBus {


    constructor(){

        this.events={};

    }



    on(name, callback){

        if(!this.events[name]){

            this.events[name]=[];

        }


        this.events[name].push(callback);

    }



    emit(name, data){

        if(!this.events[name]){

            return;

        }


        this.events[name]

        .forEach(callback => {

            callback(data);

        });

    }



    off(name, callback){

        if(!this.events[name]){

            return;

        }


        this.events[name] =

        this.events[name]

        .filter(

            item => item !== callback

        );

    }


}


export default new EventBus();
