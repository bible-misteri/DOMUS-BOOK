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
import ExportPage from "../pages/Export/index.js";

const routes = [

    {
        path: "home",
        title: "Home",
        icon: "🏠",
        page: HomePage
    },

    {
        path: "books",
        title: "Books",
        icon: "📚",
        page: BooksPage
    },

    {
        path: "editor",
        title: "Editor",
        icon: "✍️",
        page: EditorPage
    },

    {
        path: "review",
        title: "Review",
        icon: "📝",
        page: ReviewPage
    },

    {
        path: "preview",
        title: "Preview",
        icon: "👁️",
        page: PreviewPage
    },

    {
        path: "publish",
        title: "Publish",
        icon: "🚀",
        page: PublishPage
    },

    {
        path: "export",
        title: "Export",
        icon: "📕",
        page: ExportPage
    }

];

export default routes;
