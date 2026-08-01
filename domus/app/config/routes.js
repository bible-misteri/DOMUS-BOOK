/*
====================================================
DOMUS Framework v1.0
Application Routes
====================================================
*/

import HomePage from "../pages/Home/index.js";
import BooksPage from "../pages/Books/index.js";
import EditorPage from "../pages/Editor/index.js";
import ReviewPage from "../pages/Review/index.js";
import PreviewPage from "../pages/Preview/index.js";
import PublishPage from "../pages/Publish/index.js";

const routes = [

    {
        path: "home",
        page: HomePage
    },

    {
        path: "books",
        page: BooksPage
    },

    {
        path: "editor",
        page: EditorPage
    },

    {
        path: "review",
        page: ReviewPage
    },

    {
        path: "preview",
        page: PreviewPage
    },

    {
        path: "publish",
        page: PublishPage
    }

];

export default routes;
