/*
====================================================
DOMUS Framework v1.0
Base Service
====================================================
*/

import Logger from "./Logger.js";

export default class Service {

    constructor(name = "Service") {

        this.name = name;

    }

    log(...message) {

        Logger.info(`[${this.name}]`, ...message);

    }

    debug(...message) {

        Logger.debug(`[${this.name}]`, ...message);

    }

    warn(...message) {

        Logger.warn(`[${this.name}]`, ...message);

    }

    error(...message) {

        Logger.error(`[${this.name}]`, ...message);

    }

    async initialize() {

        return true;

    }

    async destroy() {

        return true;

    }

}
