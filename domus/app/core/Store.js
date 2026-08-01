/*
====================================================
DOMUS Framework v1.0
Reactive Store
====================================================
*/

import Storage from "./Storage.js";
import EventBus from "./EventBus.js";

class Store {

    constructor() {

        this.defaultState = {

            user: null,

            books: [],

            activeBook: null,

            activeChapter: null,

            settings: {

                theme: "light"

            }

        };

        this.state = {

            ...this.defaultState

        };

    }

    initialize() {

        const saved = Storage.load("state");

        if (saved) {

            this.state = {

                ...this.defaultState,

                ...saved

            };

        }

        return this.state;

    }

    get(key) {

        return this.state[key];

    }

    getAll() {

        return {

            ...this.state

        };

    }

    has(key) {

        return Object.prototype.hasOwnProperty.call(

            this.state,

            key

        );

    }

    set(key, value) {

        if (this.state[key] === value) {

            return;

        }

        this.state[key] = value;

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

    update(object) {

        Object.assign(

            this.state,

            object

        );

        Storage.save(

            "state",

            this.state

        );

        EventBus.emit(

            "state.updated",

            this.getAll()

        );

    }

    remove(key) {

        if (!this.has(key)) {

            return;

        }

        delete this.state[key];

        Storage.save(

            "state",

            this.state

        );

        EventBus.emit(

            "state.removed",

            key

        );

    }

    reset() {

        this.state = {

            ...this.defaultState

        };

        Storage.remove("state");

        EventBus.emit(

            "state.reset"

        );

    }

}

export default new Store();
