/*
====================================================
DOMUS Framework v1.0
Menus
====================================================
*/

import routes from "./routes.js";

const menus = routes.map(route => ({

    title: `${route.icon} ${route.title}`,

    page: route.path

}));

export default menus;
