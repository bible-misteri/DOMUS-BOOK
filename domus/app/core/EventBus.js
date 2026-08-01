/*
====================================================
DOMUS Framework v1.0
Event Bus
====================================================
*/

class EventBus {

    constructor() {

        this.events = {};

    }

    on(name, callback) {

        if (!this.events[name]) {

            this.events[name] = [];

        }

        this.events[name].push(callback);

        return callback;

    }

    once(name, callback) {

        const wrapper = (data) => {

            callback(data);

            this.off(name, wrapper);

        };

        this.on(name, wrapper);

    }

    emit(name, data = null) {

        if (!this.events[name]) {

            return false;

        }

        this.events[name].forEach(callback => {

            callback(data);

        });

        return true;

    }

    off(name, callback) {

        if (!this.events[name]) {

            return;

        }

        this.events[name] = this.events[name].filter(

            item => item !== callback

        );

        if (this.events[name].length === 0) {

            delete this.events[name];

        }

    }

    clear(name) {

        if (name) {

            delete this.events[name];

            return;

        }

        this.events = {};

    }

    has(name) {

        return !!this.events[name];

    }

    listeners(name) {

        return this.events[name] || [];

    }

}

export default new EventBus();
