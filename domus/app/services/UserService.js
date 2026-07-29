/*
====================================================
DOMUS Framework v1.0
User Service
====================================================
*/

import Service from "../core/Service.js";
import Store from "../core/Store.js";

class UserService extends Service {

    constructor() {

        super("UserService");

    }

    async initialize() {

        this.log("UserService initialized.");

    }

    getCurrentUser() {

        return Store.get("user");

    }

    isLoggedIn() {

        return this.getCurrentUser() !== null;

    }

    login(user) {

        Store.set("user", user);

        this.log("User logged in.");

    }

    logout() {

        Store.set("user", null);

        this.log("User logged out.");

    }

    update(data) {

        const user = {

            ...this.getCurrentUser(),

            ...data

        };

        Store.set("user", user);

    }

}

export default new UserService();
