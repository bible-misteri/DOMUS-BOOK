import Component from "../../core/Component.js";
import Router from "../../core/Router.js";

export default class Sidebar extends Component {

    template() {

        return `
<nav class="domus-sidebar">

<button data-page="home">Home</button>

<button data-page="books">Books</button>

<button data-page="editor">Editor</button>

<button data-page="review">Review</button>

<button data-page="preview">Preview</button>

<button data-page="publish">Publish</button>

</nav>
`;

    }

    afterRender() {

        this.element
            .querySelectorAll("[data-page]")
            .forEach(button => {

                button.onclick = () => {

                    Router.go(

                        button.dataset.page

                    );

                };

            });

    }

}
