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

    key(name) {

        return `${this.prefix}_${name}`;

    }

    save(name, data) {

        try {

            localStorage.setItem(

                this.key(name),

                JSON.stringify(data)

            );

            return true;

        } catch (error) {

            console.error(

                "DOMUS Storage Error:",

                error

            );

            return false;

        }

    }

    load(name, fallback = null) {

        try {

            const data = localStorage.getItem(

                this.key(name)

            );

            if (data === null) {

                return fallback;

            }

            return JSON.parse(data);

        } catch (error) {

            console.error(

                "DOMUS Load Error:",

                error

            );

            return fallback;

        }

    }

    has(name) {

        return localStorage.getItem(

            this.key(name)

        ) !== null;

    }

    remove(name) {

        localStorage.removeItem(

            this.key(name)

        );

    }

    clear() {

        Object.keys(localStorage)

            .filter(key =>

                key.startsWith(this.prefix)

            )

            .forEach(key =>

                localStorage.removeItem(key)

            );

    }

    keys() {

        return Object.keys(localStorage)

            .filter(key =>

                key.startsWith(this.prefix)

            )

            .map(key =>

                key.replace(

                    `${this.prefix}_`,

                    ""

                )

            );

    }

}

export default new Storage();
