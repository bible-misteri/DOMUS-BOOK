/*
====================================================
DOMUS Framework v1.0
Logger Engine
====================================================
*/

class Logger {

    constructor() {

        this.enabled = true;
        this.level = "debug";

        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        };

    }

    setEnabled(enabled = true) {

        this.enabled = enabled;

    }

    setLevel(level = "debug") {

        if (this.levels[level] !== undefined) {
            this.level = level;
        }

    }

    canLog(level) {

        return this.levels[level] >= this.levels[this.level];

    }

    timestamp() {

        return new Date().toISOString();

    }

    write(level, ...message) {

        if (!this.enabled) return;

        if (!this.canLog(level)) return;

        console[level](
            `[${this.timestamp()}] [${level.toUpperCase()}]`,
            ...message
        );

    }

    debug(...message) {

        this.write("debug", ...message);

    }

    info(...message) {

        this.write("info", ...message);

    }

    warn(...message) {

        this.write("warn", ...message);

    }

    error(...message) {

        this.write("error", ...message);

    }

}

export default new Logger();
